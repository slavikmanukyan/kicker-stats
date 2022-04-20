import mongoose from "mongoose";

export interface Player extends mongoose.Document {
  name: string;
}

const Player = new mongoose.Schema<Player>({
  name: { type: String, required: true },
});

export default mongoose.models.Player ||
  mongoose.model<Player>("Player", Player);
