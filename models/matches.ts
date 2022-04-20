import mongoose from "mongoose";

export interface Match extends mongoose.Document {
  player1: string;
  player2?: string;
  player3: string;
  player4?: string;
  score1: number;
  score2: number;
  round: string;
  tournament: string;
  tournamentDay: Date;
  day: Date;
  final: boolean;
}

const Match = new mongoose.Schema<Match>({
  player1: { type: String, required: true },
  player2: { type: String, required: false },
  player3: { type: String, required: true },
  player4: { type: String, required: false },
  score1: { type: Number, required: true },
  score2: { type: Number, required: true },
  round: { type: String, required: true },
  tournament: { type: String, required: true },
  tournamentDay: { type: Date, required: true },
  day: { type: Date, required: true },
  final: { type: Boolean, required: true, default: false },
});

export default mongoose.models.Match || mongoose.model<Match>("Match", Match);
