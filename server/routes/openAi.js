// -------------------------------------------------------------------------------
// > OPEN AI CONTROLLER < //
// -------------------------------------------------------------------------------
import express from 'express';
import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid'; // generate unique identifier for AI images
import { createClient } from '@supabase/supabase-js'; // connect to db using Secret Key to authenticate for supabase storage

const aiRouter = express.Router();

// -------------------------------------------------------------------------------
// > SUPABASE CONFIG < //
// -------------------------------------------------------------------------------
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// -------------------------------------------------------------------------------
// > HELPER FUNCTIONS < //
// -------------------------------------------------------------------------------
// * Check for OPENAI API Key
const validateApiKey = (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    return res
      .status(500)
      .json({ error: 'OpenAI API key is missing from ENV file' });
  }
  return null;
};

// * Start OpenAI
const createOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 60000, // 1 min timeout if no response received
  });
};

// * Error handling
const handleError = (error, res) => {
  console.error('Detailed OpenAI API Error:', {
    message: error.message,
    stack: error.stack,
    name: error.name,
  });

  res.status(500).json({
    error: 'Failed to generate AI generated Perks',
    details: error.message,
  });
};

// -------------------------------------------------------------------------------
// > AI - IMAGES ROUTE < //
// -------------------------------------------------------------------------------
aiRouter.post('/image', async (req, res, next) => {
  console.clear();
  console.group('AI IMAGE ROUTE');

  // -----------------------------------------------
  // * Error handling for missing ENV API key
  // -----------------------------------------------
  const apiKeyError = validateApiKey(req, res);
  if (apiKeyError) return apiKeyError;

  const { type, prompt: customPrompt } = req.body;
  const defaultImagePrompt =
    'Create an anime style picture of the chore, vacuuming';
  const imagePrompt =
    customPrompt && customPrompt.trim() ? customPrompt : defaultImagePrompt; // check if custom prompt is provided(trim leading/trailing spaces)

  console.log('1. Image prompt:', imagePrompt);

  try {
    const openai = createOpenAIClient();

    const response = await openai.images.generate({
      // model: 'dall-e-3', // Defaults to dall-e-2 if none provided
      prompt: imagePrompt,
      n: 1, // num of images to generate between 1 and 10 (only for dall-e-3)
      size: '1024x1024', // Other options for dall-e-3 - 1024x1792 or 1792x1024
      style: 'vivid', // or 'natural'
    });

    const aiImageUrl = response.data[0].url;
    console.log('2. AI Image generation URL:', aiImageUrl);

    // * Download image from image generation
    // * Save as unique file using UUID in either chores or perks
    const imageResponse = await fetch(aiImageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image of AI ${type}. 😟`);
    }

    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);

    console.log('imageArrayBuffer', imageArrayBuffer);
    console.log('imageBuffer', imageBuffer);

    const folder = type ? type : 'chore';
    const fileName = `${folder}/${uuidv4()}.png`;

    console.log('Folder:', folder);
    console.log('File Name:', fileName);

    // * Upload image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('roomies')
      .upload(fileName, imageBuffer);

    if (uploadError) throw uploadError;

    // * Get URL for the uploaded images
    const { data } = supabase.storage.from('roomies').getPublicUrl(fileName);

    const publicURL = data.publicUrl;

    console.log('3. Supabase Public URL:', publicURL); // !!! INVESTIGATE AS THE PUBLIC URL NOT SHOWING EVEN WHEN BUCKET SET TO PUBLIC; LOOK INTO SIGNED URL?!
    console.groupEnd();

    return res.status(200).json({ aiImageResponse: publicURL });
  } catch (error) {
    handleError(error, res);
  }
});

// -------------------------------------------------------------------------------
// > AI - Text Route < //
// -------------------------------------------------------------------------------
aiRouter.post('/', async (req, res, next) => {
  console.clear();
  console.group('AI TEXT ROUTE');

  // -----------------------------------------------
  // * Error handling for missing ENV API key
  // -----------------------------------------------
  const apiKeyError = validateApiKey(req, res);
  if (apiKeyError) return apiKeyError;

  // -------------------------------------------------------------------------------
  // * PROMPTS * //
  // Make this component reusable to pass in multiple types of prompts (ie. currently setup to pass in Chores or Prompts.. can use more)
  // -------------------------------------------------------------------------------
  const { type, prompt: customPrompt } = req.body;

  const defaultPrompts = {
    chore: 'Provide a random chore suggestion. Only provide name of the chore.',
    perk: 'Provide a random perk such as a Pizza Party. Just provide the name of the perk and nothing else',
  };

  const prompt = customPrompt || defaultPrompts[type] || defaultPrompts.perk;

  console.log('1. Prompt type:', type);
  console.log('2. customPrompt:', customPrompt);

  try {
    const openai = createOpenAIClient();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 250, // Response length limit
    });

    const aiTextResponse =
      completion.choices[0].message.content.trim() || 'No response generated';

    // res.locals.aiTextResponse = aiTextResponse;
    // next();
    console.log(`3. AI ${type} Response: ${aiTextResponse}`);
    console.groupEnd();

    res.status(200).json({ aiTextResponse });
  } catch (error) {
    handleError(error, res);
  }
});

// -------------------------------------------------------------------------------
// > MODULE EXPORT < //
// -------------------------------------------------------------------------------
export default aiRouter;

// -------------------------------------------------------------------------------
// * Some ideas on how we may utilize/reuse this component
// -------------------------------------------------------------------------------
// * CHORES
// ? Smart chore suggestion based on what the user has completed in the past
// ? Predicive chore scheduling  for maintenance (ie. furnace filter was last cleaned 3 months ago so suggest that as an upcoming chore?)
// ? Could also be used for recurring chores such as homework
// ? Prioritize/rank chores based on importance - far stretch goal
// ? If we have multi user implemented (shared household), ai can suggest who should do the chore based on completed chores db history

// * PERKS
// ? Perk recommendations (possibly based on past perk selections)
// ? Dynamically adjust token value based on frequency collected? Like the stock market?
// ? Gamification / Competition (if household multi user implemented)
