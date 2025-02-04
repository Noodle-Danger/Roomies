import pool from '../models/roomiesModels.js';
const perksController = {};

/**
 * 
 *
 * @param req  
 * @param res  
 * @param next  
 * @return  
 */
perksController.getPerks = async (req, res, next) => {
    const query = 'SELECT * FROM perks WHERE qty_remaining > 0;'

    try{
        const result = await pool.query(query);

        res.locals.perks = result.rows;

        next();
    } catch(err){
        return next({
            log: 'An error occured in getPerks middleware',
            status: 400,
            message: 'An error occured in getPerks middleware'
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
perksController.addPerk = async (req, res, next) => {
    const { perk_name, tokens, qty } = req.body;

    if (!perk_name | !tokens | !qty) return res.status(400).json({error: "Missing input"});

    const query = `
    INSERT INTO perks (perk_name, tokens, qty_initial, qty_remaining, id) 
    VALUES ($1, $2, $3, $3, ((SELECT MAX(id) FROM perks) + 1)) 
    RETURNING *;
    `;

    try {
        const result = await pool.query(query, [perk_name, tokens, qty]);

        res.locals.newPerk = result.rows;
        
        next();
    } catch(err){
        console.log("Error is: ", err);

        next({
            log: "Error occured in addPerk middleware",
            status: 400,
            message: "Error occured in addPerk"
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
perksController.buyPerk = async (req, res, next) => {
    const { perk_id, user_id, user_tokens, perk_tokens } = req.body;

    if (user_tokens < perk_tokens) return res.status(400).json({error: "User does not have enough tokens"});

    try {

        const decrementUserTokens = `
        UPDATE users
        SET tokens = tokens - $1
        WHERE id = $2
        RETURNING *;
        `;
        const userTokens = await pool.query(decrementUserTokens, [perk_tokens, user_id]);

        const decrementPerks = `
            UPDATE perks
            SET qty_remaining = qty_remaining - 1
            WHERE id = $1
            RETURNING *;
        `;
        const perks = await pool.query(decrementPerks, [perk_id]);

        const incrementUserPerks = `
            INSERT INTO user_perks (user_id, perk_id, qty)
            VALUES ($1, $2, 1)
            ON CONFLICT (user_id, perk_id)
            DO UPDATE SET qty = user_perks.qty + 1
            RETURNING *;
        `;
        const userPerks = await pool.query(incrementUserPerks, [user_id, perk_id]);

        res.locals.buyPerk = {
            user: userTokens.rows[0],
            perk: perks.rows[0],
            userPerks: userPerks.rows[0]
        };

        next();
    } catch(err){
        console.log("Error is: ", err);
        
        next({
            log: "Error in incrementUserPerks",
            status: 400,
            message: "An error occurred."
        });
    };
};


export default perksController;