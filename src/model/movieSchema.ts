import { Document, Schema, Types, model } from 'mongoose'

interface IMovie extends Document {
  title: string
  director: string
  releaseDate: string
  owner: Types.ObjectId
}

const movie = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseDate: {
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

export const Movie = model<IMovie>('movie', movie)
