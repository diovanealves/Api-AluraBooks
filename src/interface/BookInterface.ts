import * as yup from 'yup'
import mongoose from 'mongoose'

export const BookSchemaCreate = yup.object({
  title: yup
    .string()
    .required('title is required')
    .matches(/\S/, 'title was provided blank'),
  description: yup
    .string()
    .required('description is required')
    .matches(/\S/, 'description was provided blank'),
  author: yup
    .string()
    .required('author is required')
    .test('is-object-id', 'author must be a valid ObjectId', (value) => {
      return mongoose.Types.ObjectId.isValid(value)
    })
    .matches(/\S/, 'author was provided blank'),
  publisher: yup
    .string()
    .required('publisher is required')
    .test(
      'enum',
      `the publisher provided is not a permitted value`,
      (value) => {
        if (!['Casa do Código', 'Alura'].includes(value)) {
          throw new yup.ValidationError(
            `the Publisher ${value} provided is not a permitted value`,
          )
        }
        return true
      },
    )
    .matches(/\S/, 'publisher was provided blank'),
  numberPages: yup
    .number()
    .min(10, 'The number of pages should be between 10 and 5000')
    .max(5000, 'The number of pages should be between 10 and 5000')
    .required('Number of pages required'),
})

export const BookSchemaUpdate = yup.object({
  title: yup
    .string()
    .optional()
    .matches(/\S/, 'nationality was provided blank'),
  description: yup
    .string()
    .optional()
    .matches(/\S/, 'nationality was provided blank'),
  publisher: yup
    .string()
    .optional()
    .test(
      'enum',
      'the publisher provided is not a permitted value',
      (value) => {
        if (value && !['Casa do Código', 'Alura'].includes(value)) {
          throw new yup.ValidationError(
            `the Publisher ${value} provided is not a permitted value`,
          )
        }
        return true
      },
    )
    .matches(/\S/, 'nationality was provided blank'),
  numberPages: yup
    .number()
    .min(10, 'The number of pages should be between 10 and 5000')
    .max(5000, 'The number of pages should be between 10 and 5000')
    .optional(),
})
