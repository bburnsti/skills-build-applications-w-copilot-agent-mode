import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true, min: 1 },
    score: { type: Number, required: true, min: 0 },
    workoutsCompleted: { type: Number, required: true, min: 0 },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);