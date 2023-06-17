import z from 'zod'

export const BookSchemaCreate = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  publisher: z.string(),
})

export const BookSchemaUpdate = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
})
