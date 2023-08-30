import * as yup from 'yup'
import mongoose from 'mongoose'

export const BookSchemaCreate = yup.object({
  title: yup.string().required('title is required'),
  description: yup.string().required('description is required'),
  author: yup
    .string()
    .required('author is required')
    .test('is-object-id', 'author must be a valid ObjectId', (value) => {
      return mongoose.Types.ObjectId.isValid(value)
    }),
  publisher: yup.string().required('publisher is required'),
})

export const BookSchemaUpdate = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  publisher: yup.string().optional(),
})
