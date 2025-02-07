import pool from '../models/roomiesModels.js';
const choresController = {};

/**
 * getChores
 * Returns only incomplete chores.
 */
choresController.getChores = async (req, res, next) => {
  // Using a fixed condition to only return incomplete chores.
  const getChoresQuery = 'SELECT * FROM chores WHERE is_complete = FALSE';
  try {
    const result = await pool.query(getChoresQuery);
    res.locals.chores = result.rows;
    console.log('getChores returns: ', result.rows);
    next();
  } catch (err) {
    return next({
      log: 'An error occured in the getChores middleware function',
      status: 400,
      message: 'An error occured.',
    });
  }
};

/**
 * getCompletedChores
 * Returns completed chores for a given user.
 * (Included from the dev branch.)
 */
choresController.getCompletedChores = async (req, res, next) => {
  const { user_id } = req.params;
  console.log('user_id from getCompletedChores', user_id);
  console.log('req.params from getCompletedChores', req.params);
  const getCompletedChoresQuery = `
    SELECT * FROM chores 
    WHERE is_complete = TRUE AND user_id = $1
  `;
  try {
    const result = await pool.query(getCompletedChoresQuery, [user_id]);
    res.locals.completeChores = result.rows;
    console.log('getCompletedChores returns: ', result.rows);
    next();
  } catch (err) {
    return next({
      log: 'An error occured in the getCompletedChores middleware function',
      status: 400,
      message: 'An error occured.',
    });
  }
};

/**
 * createChore
 * Creates a new chore. If a chore_img is provided, it is included; otherwise null.
 */
choresController.createChore = async (req, res, next) => {
  const { task_name, tokens, user_id, chore_img } = req.body;
  if (!task_name || !tokens || !user_id)
    return res
      .status(400)
      .json({ error: 'Missing task_name or tokens or user_id' });

  const createChoreQuery =
    'INSERT INTO chores (task_name, tokens, user_id, chore_img) VALUES ($1, $2, $3, $4) RETURNING *';

  try {
    const result = await pool.query(createChoreQuery, [
      task_name,
      tokens,
      user_id,
      chore_img || null,
    ]);
    res.locals.newChore = result.rows[0];
    console.log('This is res.locals.newChore: ', res.locals.newChore);
    next();
  } catch (err) {
    console.error('This is the error: ', err);
    next({
      log: 'An error occured in the roomiesController.createChore middleware.',
      status: 400,
      message: 'An error occured.',
    });
  }
};

/**
 * completeChore
 * Marks a chore as complete and updates the user's tokens.
 * Also, updates the chore record with the user_id of the completer.
 */
choresController.completeChore = async (req, res, next) => {
  const { user_id, chore_id } = req.body;
  console.log('user_id in completeChore', user_id);

  const incrementTokens = `
        UPDATE users
        SET tokens = tokens + COALESCE(
            (SELECT tokens FROM chores WHERE id = $2 AND is_complete = FALSE),
            0
        )
        WHERE id = $1
        RETURNING *;
  `;

  const completeChore = `
        UPDATE chores 
        SET is_complete = TRUE, user_id = $1
        WHERE id = $2
        RETURNING *;
  `;

  try {
    const result2 = await pool.query(incrementTokens, [user_id, chore_id]);
    const result = await pool.query(completeChore, [user_id, chore_id]);
    // We are returning the updated chore record.
    res.locals.completeChore = result.rows[0];
    console.log('completeChore returned', result.rows);
    next();
  } catch (err) {
    console.error('This is the error: ', err);
    next({
      log: 'Error in the choresController.completeChore middleware',
      status: 400,
      message: 'An error occured.',
    });
  }
};

export default choresController;
