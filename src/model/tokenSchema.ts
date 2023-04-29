import { Document, Schema, Types, model } from 'mongoose'

interface IToken extends Document {
  accessToken: string
  owner: Types.ObjectId
}

const token = new Schema<IToken>(
  {
    accessToken: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

export const Token = model<IToken>('token', token)
