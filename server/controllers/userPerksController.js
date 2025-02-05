import pool from '../models/roomiesModels.js';
const userPerksController = {};

userPerksController.getPerks = async (req, res, next) => {
    // const { user_id } = req.body;

    const query = `
    SELECT up.*, p.perk_name
    FROM user_perks up
    LEFT JOIN perks p ON up.perk_id = p.id
    `;

    try {
        const result = await pool.query(query);//, [user_id]);

        res.locals.allPerks = result.rows;

        next();
    } catch(err){
        console.log("Error is", err);

        next({
            log: 'Error in getPerks',
            status: 400,
            message: 'Error occured in getPerks'
        });
    };
};

export default userPerksController;
