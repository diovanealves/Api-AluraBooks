import * as yup from 'yup'

export const AuthorSchemaCreate = yup.object({
  name: yup
    .string()
    .required('name is required')
    .matches(/\S/, 'name was provided blank'),
  nationality: yup
    .string()
    .required('nationality is required')
    .matches(/\S/, 'nationality was provided blank'),
})

export const AuthorSchemaUpdate = yup.object({
  name: yup.string().optional().matches(/\S/, 'name was provided blank'),
  nationality: yup
    .string()
    .optional()
    .matches(/\S/, 'nationality was provided blank'),
})
