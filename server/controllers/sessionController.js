import pool from '../models/aTuneModels.js';

export const createSessionFromLocals = async (req, res, next) => {
  if (!res.locals.username || !res.locals.password) {
    return next({
      log: 'error in seschCont.createSessionFromLocals, res.locals should have username and password ',
      status: 500,
      message: 'we had an error with session creation code:5008',
    });
  }

  const queryString1 = `
  SELECT _id,ssid FROM public.session
  WHERE username = $1 AND password = $2;
  `;
  const queryValues1 = [res.locals.username, res.locals.password];

  pool
    .query(queryString1, queryValues1)
    .then((found) => {
      if (found.rows.length === 0) {
        const queryString2 = `
            INSERT INTO public.session 
            (username, password, ssid)
            -- _id and created_at will default
             VALUES($1, $2, $3);
            `;
        let generatedSsid = Math.random() * 8572;
        const queryValues2 = [res.locals.username, res.locals.password, generatedSsid];
        pool
          .query(queryString2, queryValues2)
          .then((resp) => {
            console.log('creating new session...');
            console.log(resp);
            res.cookie('ssidATTUNE', generatedSsid, { httpOnly: true });
            console.log('created ssid cookie...');
            return next();
          })
          .catch((err) => {
            return next({ log: `error, ${err}`, status: 500, message: 'an internal server error occured with ssession creation code:5024' });
          });
      } else {
        console.log('session with this usernme and password already exists... but cookieing just in case.');
        res.cookie('ssidATTUNE', found.rows[0].ssid, { httpOnly: true });
        return next();
      }
    })
    .catch((err) => {
      return next({ log: `error, ${err}`, status: 500, message: 'an internal server error occured with ssession creation code:5024' });
    });
};

export const setLocalsFromCookieSession = async (req, res, next) => {
  let SSID = req.cookies.ssidATTUNE;
  if (!SSID) {
    return next({ log: 'no ssidATTUNE cookie at slfcs', status: 400, message: 'your session may be expired.' });
  }
  const queryString = `
  SELECT username,password 
  FROM public.session s 
  WHERE s.ssid = $1;
  `;
  const queryValues = [SSID];
  pool.query(queryString, queryValues).then((resp) => {
    // console.log('getting session...');
    if (resp.rows.length !== 1) {
      // should never come up but when hacking does come up err on theside of erroring.
      return next({ log: 'err, user did have ssidATTUNE cookie but it was not in database', status: 400, message: 'your session may be expired.' });
    } else {
      res.locals.username = resp.rows[0].username;
      res.locals.username = resp.rows[0].password;
      console.log('user has active session...');
      next();
    }
  });
};

//helper functions
