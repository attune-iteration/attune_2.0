import { Router } from 'express';
import {
  userId,
  getDaily,
  addNewHabit,
} from '../controllers/aTuneController.js';

const router = Router();

/*
 * A route for getting userId
 */
router.get('/userId', userId, (req, res) => {
  return res.status(200).json({ userId: req.userId });
});

router.get('/', (req, res) => {
  return res.status(200).send();
})

/*
 * A route for getting a daily habit
 */
router.get('/dayview', getDaily, (req, res) => {
  return res.status(200).json({ dailyHabits: req.dailyHabits });
});

/*
 * A route for creating a new habit
 */
router.post('/addNewHabit', addNewHabit, (req, res) => {
  return res.status(200).json({ newHabit: req.newHabit });
});

export default router;
