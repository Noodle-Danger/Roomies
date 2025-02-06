// Steven: Down to delete or re-factor comments
import path from 'path'; // provides utilities for working with file and directory paths
import express from 'express';
import apiRouter from './routes/api.js';
import { fileURLToPath } from 'url'; //* build the dirname manually due to es6 restrictions

const app = express();
const PORT = process.env.PORT || 8081; // ✅ Use Railway's assigned port
const __filename = fileURLToPath(import.meta.url); //*recreate dirname for ES6 modules
const __dirname = path.dirname(__filename);

const defaultPort = 8080;
const port = process.env.PORT || defaultPort;


//cors acceptance middleware???
//?check if need to install cors, don't think so because react and express are running on the same port 3000??
//! install CORS, make sure its saved
import cors from 'cors';
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

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

// Function to check if the port is in use
const checkPortInUse = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      server.close();
      resolve();
    });

    server.on('error', () => reject('Port already in use'));
  });
};

checkPortInUse(port)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(() => {
    const fallbackPort = 8081;
    console.log(`Port ${port} in use, switching to ${fallbackPort}`);
    app.listen(fallbackPort, () => {
      console.log(`Server running on port ${fallbackPort}`);
    });
  });