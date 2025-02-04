// Steven: Down to delete or re-factor comments
import path from 'path'; // provides utilities for working with file and directory paths
import express from 'express';
import apiRouter from './routes/api.js';
import { fileURLToPath } from 'url'; //* build the dirname manually due to es6 restrictions

const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url); //*recreate dirname for ES6 modules
const __dirname = path.dirname(__filename);

//cors acceptance middleware???
//?check if need to install cors, don't think so because react and express are running on the same port 3000??
//! install CORS, make sure its saved
import cors from 'cors';
app.use(cors());

//---------------------------------- Standard Routes ----------------------------------------------------//
app.use(express.json()); // converts request object as json
app.use(express.urlencoded({ extended: true })); // recognizes request object as strings or arrays
app.use(express.static(path.resolve(__dirname, '../src/assets'))); // geneerating static files

//---------------------------------- Custom Routes ----------------------------------------------------//
app.use('/api', apiRouter);

//---------------------------------- Standard Routes ----------------------------------------------------//
app.use((req, res) =>
  res.status(404).send('This is not the page you\re looking for.')
); // catch all error handler

app.use((err, req, res, _next) => {
  // global error handler
  const defaultError = {
    log: 'Express caught an unknown middleware error.', // intended for developer?
    status: 500,
    message: { err: 'An error occured.' }, // intended for user?
  };

  const errorObject = Object.assign({}, defaultError, err);
  console.log(errorObject.log);
  return res.status(errorObject.status).json(errorObject.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
