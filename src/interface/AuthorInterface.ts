import z from 'zod'

export const AuthorSchemaCreate = z.object({
  name: z.string(),
  nationality: z.string(),
})

export const AuthorSchemaUpdate = z.object({
  name: z.string().optional(),
  nationality: z.string().optional(),
})
