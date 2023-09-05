import { model, Schema } from 'mongoose'

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
  publisher: {
    type: String,
    required: true,
  },
  numberPages: {
    type: Number,
    required: true,
  },
})

export const Books = model('Book', BookSchema)
