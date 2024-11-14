import pool from '../models/aTuneModels.js';

export const createAccount = async (req, res, next) => {
  let { username, password } = req.query;

  if (!username || !password) {
    next({
      log: 'client forwent username/password',
      status: 400,
      message: `you must specify a username and a password query params.`,
    });
  }

  let queryString = `
  INSERT INTO public._user (name, password) 
  VALUES ($1, $2);
  `;
  let queryValues = [username, password];
  pool
    .query(queryString, queryValues)
    .then((response) => {
      console.log(response);
      res.locals.username = username;
      res.locals.password = password;
      return next();
    })
    .catch((err) => {
      return next({ log: `${err}`, message: `you got an error, try a different username/password, or check if you have any special characters` });
    });
};
export const logInUser = async (req, res, next) => {
  let { username, password } = req.query;

  if (!username || !password) {
    next({
      log: 'client forwent username/password',
      status: 400,
      message: `you must specify a username and a password query params.`,
    });
  }

  let queryString = `
  SELECT (_id) FROM public._user 
  WHERE name = $1 AND password = $2;
  `;
  let queryValues = [username, password];
  pool
    .query(queryString, queryValues)
    .then((response) => {
      console.log(response);
      if (response.rows.length !== 1) {
        return res.status(401).json({ successful: false, message: 'Incorrect username or password, thats all we know.  . . .   ...   . . . ok actually we do know which one(s) is/are incorrect but we just dont want to tell you. (:' });
      }
      res.locals.username = username;
      res.locals.password = password;
      return next();
    })
    .catch((err) => {
      return next({ log: `${err}`, message: `you got an error, try a different username/password, or check if you have any special characters` });
    });
};
