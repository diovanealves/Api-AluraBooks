import { model, Schema } from 'mongoose'

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
})

export const Author = model('Author', AuthorSchema)
