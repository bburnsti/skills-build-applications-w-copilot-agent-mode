import express from 'express';
import type { ErrorRequestHandler } from 'express';
import cors from 'cors';

import './config/database.js';
import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const frontendUrl = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';
const allowedOrigins = ['http://localhost:5173', frontendUrl];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users/', async (_request, response, next) => {
  try {
    const users = await User.find().populate('team', 'name mascot city').sort({ displayName: 1 }).lean();
    response.json({ users });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_request, response, next) => {
  try {
    const teams = await Team.find().populate('members', 'username displayName fitnessLevel').sort({ name: 1 }).lean();
    response.json({ teams });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().populate('user', 'username displayName').sort({ activityDate: -1 }).lean();
    response.json({ activities });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    const leaderboard = await Leaderboard.find().populate('user', 'username displayName').sort({ rank: 1 }).lean();
    response.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
    response.json({ workouts });
  } catch (error) {
    next(error);
  }
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`Octofit Tracker API listening at ${baseUrl}`);
});

export default app;