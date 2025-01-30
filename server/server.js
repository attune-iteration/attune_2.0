/* eslint-disable no-unused-vars */
import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import aTuneRoutes from './routes/aTuneRoutes.js';
import initializeTables from './controllers/initializeDatabase.js';
const app = express();
//app.use(cors());

// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true, // needed
//   })
// );
// this is metter
app.use((req, res, next) => {
  console.log('allowing cors');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// create the tables in database (if those tables do not exist)
initializeTables()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
  });

app.use('/api', aTuneRoutes); // /api/dayview will be routed to the associated handler in aTuneRoutes

// dont remove the _next parameter
//

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err); // Merge default error with provided error
  console.log(errorObj.log); // Log the error

  return res.status(errorObj.status).json(errorObj.message); // Return the error to the client
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
