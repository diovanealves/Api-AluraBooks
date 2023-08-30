import { NextFunction, Request, Response } from 'express'
import { Author } from '../models/Author'
import {
  AuthorSchemaCreate,
  AuthorSchemaUpdate,
} from '../interface/AuthorInterface'
import { Books } from '../models/Book'
import { IdSchema } from '../interface/IdInterface'

class AuthorController {
  async SearchAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Author.find()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async SearchById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await IdSchema.validate({ id }, { stripUnknown: true, abortEarly: false })

      const result = await Author.findById(id)
      if (!result)
        return res.status(404).json({ err: 'Author Specify Not Found' })
      return res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async CreateAuthor(req: Request, res: Response, next: NextFunction) {
    const { name, nationality } = req.body
    try {
      await AuthorSchemaCreate.validate(
        { name, nationality },
        { stripUnknown: true, abortEarly: false },
      )

      const result = await Author.create({ name, nationality })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async EditAuthor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { name, nationality } = req.body
    try {
      await IdSchema.validate({ id }, { stripUnknown: true, abortEarly: false })

      await AuthorSchemaUpdate.validate(
        { name, nationality },
        { stripUnknown: true, abortEarly: false },
      )

      const updateDate = { name, nationality }
      const result = await Author.findByIdAndUpdate(id, { $set: updateDate })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async DeleteAuthor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await IdSchema.validate({ id }, { stripUnknown: true, abortEarly: false })

      await Author.findByIdAndDelete({ _id: id })
      const result = await Books.deleteMany({ author: id })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthorController()
