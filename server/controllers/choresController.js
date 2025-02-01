import pool from '../models/roomiesModels.js'
const choresController = {};


/**
 * 
 *
 * @param req  
 * @param res  
 * @param next  
 * @return  
 */
choresController.createChore = async (req, res, next) => {
    const { task_name, type } = req.body;

    if (!task_name || !type) return res.status(400).json({error: 'Missing task_name or type'});

    const createChoreQuery = 'INSERT INTO chores (task_name, type) VALUES ($1, $2) RETURNING *';

    try {
        const result = await pool.query(createChoreQuery, [task_name, type]);

        res.locals.newChore = result.rows[0];
        console.log('This is res.locals.newChore: ', res.locals.newChore);

        next();
    } catch(err){
        console.error("This is the error: ", err);

        next({
            log: 'An error occured in the roomiesController.createChore middleware.',
            status: 400,
            message: 'An error occured.'
        });
    };
};


/**
 * 
 *
 * @param req  
 * @param res  
 * @param next  
 * @return  
 */
choresController.assignChore = async (req, res, next) => {
    const { userId, choreId } = req.body;
    
    const assignChoreQuery = 'UPDATE chores SET assigned_to = $1 WHERE id =  $2 RETURNING *';

    try {
        const result = await pool.query(assignChoreQuery, [userId, choreId]);

        res.locals.assignedChore = result.rows[0];

        next();
    } catch(err){
        console.error("This is the error: ", err);

        next({
            log: 'Error in the roomiesController.assignChore middleware',
            status: 400,
            message: 'An error occured.'
        });
    };
};


/**
 * 
 *
 * @param req  
 * @param res  
 * @param next  
 * @return  
 */
choresController.deleteChore = async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({error: 'Chore ID is not defined.'});

    const deleteChoreQuery = 'DELETE FROM chores WHERE id = $1 RETURNING *';

    try {
        const result = await pool.query(deleteChoreQuery, [id]);

        res.locals.deletedChore = result.rows[0];
        console.log("This is result.rows[0] ", result.rows[0]);
        
        next();
    } catch(err){
        console.error("This is the error: ", err);

        next({
            log: 'An error occured in deleteChore middleware in roomiesController.',
            status: 400,
            message: 'An error occured.'
        });
    };
};


/**
 * 
 *
 * @param req  
 * @param res  
 * @param next  
 * @return  
 */
choresController.getChores = async (req, res, next) => {
    const getChoresQuery = 'SELECT * FROM chores';

    try {
        const result = await pool.query(getChoresQuery);

        res.locals.chores = result.rows;

        next();
    } catch(err){
        return next({
            log: 'An error occured in the getChores middleware function',
            status: 400, 
            message: 'An error occured.'
        });
    };
};

export default choresController;