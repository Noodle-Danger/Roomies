import pool from '../models/roomiesModels.js'
const userController = {};


/**
 * 
 *
 * @param req  
 * @param res  
 * @param next  
 * @return  
 */
userController.createUser = async (req, res, next) => {
    const { username, email } = req.body; 

    console.log(` this is the name and email info from query: [${username}, ${email}]`);
    if (!username || !email) return res.status(400).json({ error: 'Missing data in user form. Please try again.' });

    const query = `INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *`;

    try {
        const result = await pool.query(
            query, 
            [username, email]
        );

        console.log("this is result.rows", result.rows[0]);
        res.locals.newUser = result.rows[0];

        next();
    } catch(err){
        console.error('This is the error: ', err);

        return next({
            log: 'Error in createUser query in roomiesControllers',
            status: 400
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
userController.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    
    if (!id) return res.status(400).json({error: 'User ID is not defined.'});

    const deleteQuery = 'DELETE FROM users WHERE id = $1 RETURNING *;';

    try {
        const result = await pool.query(deleteQuery, [id]);

        console.log("this is result.rows", result.rows[0]);
        res.locals.deletedUser = result.rows[0];

        next();
    } catch(err){
        console.error("This is the error:", err);

        return next({
            log: 'Error in roomiesController.deleteUser query.',
            status: 400,
            message: {err: 'An error occured.'}
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
userController.getUsers = async (req, res, next) => {
    const getUsersQuery = 'SELECT * FROM users'

    try {
        const result = await pool.query(getUsersQuery);

        res.locals.users = result.rows;
        
        next();
    } catch(err){
        console.error('This is the error: ', err);
        
        next({
            log: 'Error in roomiesController.getUsers.',
            status: 400,
            message: 'An error occured.'
        });
    };
};


export default userController;