import { Document, Schema, model } from 'mongoose'

interface IUser extends Document {
  username: string
  email: string
  password: string
}

const user = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const User = model<IUser>('user', user)
