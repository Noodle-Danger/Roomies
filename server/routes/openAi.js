// --------------------------------------------------------------
// > OPEN AI CONTROLLER < //
// --------------------------------------------------------------
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

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 60000, // 1 min timeout if no response received within this time
    });

    const {
      prompt = 'Provide a random perk such as a Pizza Party. Just provide the name of the perk and nothing else.',
    } = req.body; // we can change this to dynamically provide a prompt; see suggestions below

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

// --------------------------------------------------------------
// * Some ideas on how we may utilize/reuse this component
// --------------------------------------------------------------
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
