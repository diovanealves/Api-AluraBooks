import * as yup from 'yup'
import mongoose from 'mongoose'

export const IdSchema = yup.object({
  id: yup
    .string()
    .required('Id is required')
    .test('is-object-id', 'Must be a valid ObjectId', (value) => {
      return mongoose.Types.ObjectId.isValid(value)
    }),
})
