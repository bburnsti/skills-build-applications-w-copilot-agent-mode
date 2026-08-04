import mongoose from 'mongoose';

import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        mascot: 'Summit Spark',
        city: 'Boulder',
        founded: new Date('2022-03-12'),
      },
      {
        name: 'Core Crushers',
        mascot: 'Plank Patrol',
        city: 'Austin',
        founded: new Date('2021-09-04'),
      },
    ]);

    const users = await User.insertMany([
      {
        username: 'maya_runner',
        email: 'maya.runner@example.com',
        displayName: 'Maya Chen',
        age: 29,
        team: teams[0]._id,
        fitnessLevel: 'advanced',
        joinedAt: new Date('2024-01-15'),
      },
      {
        username: 'diego_lifts',
        email: 'diego.lifts@example.com',
        displayName: 'Diego Morales',
        age: 34,
        team: teams[1]._id,
        fitnessLevel: 'intermediate',
        joinedAt: new Date('2024-02-08'),
      },
      {
        username: 'ava_moves',
        email: 'ava.moves@example.com',
        displayName: 'Ava Thompson',
        age: 26,
        team: teams[0]._id,
        fitnessLevel: 'beginner',
        joinedAt: new Date('2024-03-21'),
      },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[2]._id] }),
      Team.findByIdAndUpdate(teams[1]._id, { members: [users[1]._id] }),
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Trail run',
        durationMinutes: 48,
        caloriesBurned: 520,
        activityDate: new Date('2026-07-28T13:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 430,
        activityDate: new Date('2026-07-29T22:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Yoga flow',
        durationMinutes: 35,
        caloriesBurned: 180,
        activityDate: new Date('2026-07-30T12:15:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        rank: 1,
        score: 1840,
        workoutsCompleted: 27,
        updatedAt: new Date('2026-08-01T10:00:00Z'),
      },
      {
        user: users[1]._id,
        rank: 2,
        score: 1510,
        workoutsCompleted: 21,
        updatedAt: new Date('2026-08-01T10:00:00Z'),
      },
      {
        user: users[2]._id,
        rank: 3,
        score: 970,
        workoutsCompleted: 14,
        updatedAt: new Date('2026-08-01T10:00:00Z'),
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility Reset',
        description: 'A low-impact routine for hips, shoulders, and core stability.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['World greatest stretch', 'Glute bridge', 'Dead bug', 'Cat-cow'],
        targetMuscleGroups: ['Core', 'Glutes', 'Shoulders'],
      },
      {
        title: 'Lunch Break Strength Circuit',
        description: 'A balanced dumbbell workout for strength and conditioning.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Goblet squat', 'Dumbbell row', 'Push press', 'Farmer carry'],
        targetMuscleGroups: ['Legs', 'Back', 'Shoulders'],
      },
      {
        title: 'Summit Tempo Builder',
        description: 'A challenging cardio session built around steady climbing intervals.',
        difficulty: 'advanced',
        durationMinutes: 50,
        exercises: ['Warmup jog', 'Hill repeat', 'Tempo run', 'Cooldown walk'],
        targetMuscleGroups: ['Quads', 'Hamstrings', 'Calves'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
