import { Document, Schema, Types, model } from 'mongoose'
import moment from 'moment'

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
      validate: {
        validator: (value: string) => {
          const currentDate = moment()
          const releaseDate = moment(value, 'DD-MM-YYYY', true)

          return releaseDate.isValid() && releaseDate.isSameOrBefore(currentDate)
        },
        message: 'Release date cannot be in the future',
      },
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
