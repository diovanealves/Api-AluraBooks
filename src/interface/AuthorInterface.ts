import * as yup from 'yup'

export const AuthorSchemaCreate = yup.object({
  name: yup.string().required('name is required'),
  nationality: yup.string().required('nationality is required'),
})

export const AuthorSchemaUpdate = yup.object({
  name: yup.string().optional(),
  nationality: yup.string().optional(),
})
