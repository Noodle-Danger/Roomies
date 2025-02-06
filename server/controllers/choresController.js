import pool from "../models/roomiesModels.js";
const choresController = {};

/**
 *
 *
 * @param req
 * @param res
 * @param next
 * @return
 */
choresController.getChores = async (req, res, next) => {
    const { completed } = req.body;

  const getChoresQuery = "SELECT * FROM chores WHERE is_complete = $1";

  try {
    const result = await pool.query(getChoresQuery, [completed]);

    res.locals.chores = result.rows;
    // console.log("getChores returns: ", result.rows);

    next();
  } catch (err) {
    return next({
      log: "An error occured in the getChores middleware function",
      status: 400,
      message: "An error occured.",
    });
  }
};

/**
 *
 *
 * @param req
 * @param res
 * @param next
 * @return
 */
choresController.createChore = async (req, res, next) => {
  const { task_name, tokens, user_id } = req.body;

  if (!task_name || !tokens || !user_id)
    return res
      .status(400)
      .json({ error: "Missing task_name or tokens or user_id" });

  const createChoreQuery =
    "INSERT INTO chores (task_name, tokens, user_id) VALUES ($1, $2, $3) RETURNING *";

  try {
    const result = await pool.query(createChoreQuery, [
      task_name,
      tokens,
      user_id,
    ]);

    res.locals.newChore = result.rows[0];
    console.log("This is res.locals.newChore: ", res.locals.newChore);

    next();
  } catch (err) {
    console.error("This is the error: ", err);

    next({
      log: "An error occured in the roomiesController.createChore middleware.",
      status: 400,
      message: "An error occured.",
    });
  }
};

/**
 *
 *
 * @param req
 * @param res
 * @param next
 * @return
 */
choresController.completeChore = async (req, res, next) => {
  const { user_id, chore_id } = req.body;

  const incrementTokens = `
        UPDATE users
        SET tokens = tokens + COALESCE((SELECT tokens FROM chores WHERE id = $2 AND is_complete = FALSE), 0)
        WHERE id = $1
        RETURNING *;
    `;

  const completeChore = `
        UPDATE chores 
        SET is_complete = TRUE
        WHERE id = $1
        RETURNING *;
    `;

  try {
    const result2 = await pool.query(incrementTokens, [user_id, chore_id]);
    const result = await pool.query(completeChore, [chore_id]);

    res.locals.completeChore = [result.rows[0], result2.rows[0]];
    console.log("completeChore returned", result.rows);

    next();
  } catch (err) {
    console.error("This is the error: ", err);

    next({
      log: "Error in the choresController.completeChore middleware",
      status: 400,
      message: "An error occured.",
    });
  }
};

/**
 *
 *
 * @param req
 * @param res
 * @param next
 * @return
 */
// choresController.deleteChore = async (req, res, next) => {
//     const { id } = req.params;

//     if (!id) return res.status(400).json({error: 'Chore ID is not defined.'});

//     const deleteChoreQuery = 'DELETE FROM chores WHERE id = $1 RETURNING *';

//     try {
//         const result = await pool.query(deleteChoreQuery, [id]);

//         res.locals.deletedChore = result.rows[0];
//         console.log("This is result.rows[0] ", result.rows[0]);

//         next();
//     } catch(err){
//         console.error("This is the error: ", err);

//         next({
//             log: 'An error occured in deleteChore middleware in roomiesController.',
//             status: 400,
//             message: 'An error occured.'
//         });
//     };
// };

export default choresController;
