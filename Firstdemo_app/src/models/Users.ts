import { Schema, Document, model } from "mongoose";

export interface User {
  _id: Schema.Types.ObjectId;
  username: string;
  password: string;
  email: string;
}
//User Maybe have image, age, token,...
//schema format
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<User>("User", userSchema);
