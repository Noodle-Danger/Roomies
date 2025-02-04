// -------------------------------------------------------------------------------
// > OPEN AI CONTROLLER < //
// -------------------------------------------------------------------------------
import express from 'express';
import OpenAI from 'openai';

const aiRouter = express.Router();

aiRouter.post('/generate', async (req, res, next) => {
  // Error handling for missing ENV API key
  if (!process.env.OPENAI_API_KEY) {
    return res
      .status(500)
      .json({ error: 'OpenAI API key is missing from ENV file' });
  }

  // -------------------------------------------------------------------------------
  // * PROMPTS * //
  // Make this component reusable to pass in multiple types of prompts (ie. currently setup to pass in Chores or Prompts.. can use more)
  // -------------------------------------------------------------------------------
  const { type, prompt: customPrompt } = req.body; // we can change this to dynamically provide a prompt; see suggestions below

  //   default prompts for Chores or Perks
  const defaultChorePrompt =
    'Provide a random chore suggestion. Only provide name of the chore.';
  const defaultPerkPrompt =
    'Provide a random perk such as a Pizza Party. Just provide the name of the perk and nothing else';
  //   const defaultLookup =

  // Logic to use custom prompt, if provided, or one of the default prompts above
  let prompt;
  //   if (customPrompt) {
  //     prompt = customPrompt;
  //   } else if (type === 'chore') {
  //     prompt = defaultChorePrompt;
  //   } else if (type === 'perk') {
  //     prompt = defaultPerkPrompt;
  //   } else {
  //     prompt = defaultPerkPrompt; // falls back to perk prompt if custom prompt or type is not provided
  //   }

  if (customPrompt) {
    prompt = customPrompt;
  } else {
    switch (type) {
      case 'chore':
        prompt = defaultChorePrompt;
        break;
      case 'perk':
        prompt = defaultPerkPrompt;
        break;
      default:
        prompt = defaultPerkPrompt; // falls back to perk prompt if custom prompt or type is not provided
    }
  }

  console.log('1. Received type:', type);
  console.log('2. Received customPrompt:', customPrompt);

  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 60000, // 1 min timeout if no response received within this time
    });

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

    const aiResponse =
      completion.choices[0].message.content.trim() || 'No response generated';

    // res.locals.aiResponse = aiResponse;
    // next();
    res.status(200).json({ aiResponse });
  } catch (error) {
    console.error('Detailed OpenAI API Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    res.status(500).json({
      error: 'Failed to generate AI generated Perks',
      details: error.message,
    });
  }
});

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
