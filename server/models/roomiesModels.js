import dotenv from 'dotenv';
dotenv.config();
//*require postgres
import pkg from 'pg';
const { Pool } = pkg;

const PG_URI = process.env.PG_URI;

//*create a new pool here using the connection string above:

const pool = new Pool({
  connectionString: PG_URI,
});

//testing connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release();
});

//*test connection to database
const queryConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DATABASE SUCCESSFULLY CONNECTED: ', res.rows[0]);
    console.log("Database URL:", process.env.PG_URI);
  } catch (err) {
    console.error('ERROR IN CONNECTING TO DATABASE');
  }
};

queryConnection();

//*export an object that contains a property called query, which is a function that returns the invocation of pool.query() after logging the query
//needed in the controllers to access the database??
// export const query = (text, params, callback) => {
//         console.log('executed query', text);
//         return pool.query(text, params, callback);
// };

//*for es6 syntax, export defauly pool
export default pool;
