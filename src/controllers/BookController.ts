import { NextFunction, Request, Response } from 'express'
import { Books } from '../models/Book'
import { BookSchemaCreate, BookSchemaUpdate } from '../interface/BookInterface'
import { IdSchema } from '../interface/IdInterface'
import NotFound from '../Error/NotFound'
import IncorrectRequest from '../Error/IncorrectRequest'

class BooksController {
  async SearchAll(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        limited = 5,
        page = 1,
        sortBy = '_id',
        sortOrder = -1,
      } = req.query as {
        limited?: number
        page?: number
        sortBy?: string
        sortOrder?: 1 | -1
      }

      if (limited > 0 && page > 0) {
        const result = await Books.find()
          .sort({ [sortBy]: sortOrder })
          .skip((page - 1) * limited)
          .limit(limited)
          .populate('author')

        res.status(200).json(result)
      } else {
        next(new IncorrectRequest())
      }
    } catch (err) {
      next(err)
    }
  }

  async SearchById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await IdSchema.validate({ id }, { stripUnknown: true, abortEarly: false })

      const result = await Books.findById(id).populate('author')

      if (!result) {
        next(new NotFound('Specific book not found'))
      }

      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async SearchByFilter(req: Request, res: Response, next: NextFunction) {
    const { publisher, title } = req.query
    try {
      const query = {
        title: new RegExp(title as string, 'i'),
        ...(publisher && { publisher }),
      }

      const result = await Books.find(query).populate('author')

      if (result.length === 0) {
        res.status(200).json([])
      }

      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async CreateBook(req: Request, res: Response, next: NextFunction) {
    const BookData = req.body
    try {
      await BookSchemaCreate.validate(BookData, {
        stripUnknown: true,
        abortEarly: false,
      })
      const result = await Books.create(BookData)
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async EditBook(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const BookData = req.body
    try {
      await IdSchema.validate({ id }, { stripUnknown: true, abortEarly: false })

      await BookSchemaUpdate.validate(BookData, {
        stripUnknown: true,
        abortEarly: false,
      })

      const updateData = {
        title: BookData.title,
        description: BookData.description,
        author: BookData.author,
        publisher: BookData.publisher,
      }

      const result = await Books.findByIdAndUpdate(id, { $set: updateData })

      if (!result) {
        next(new NotFound('Book id not found'))
      }

      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async DeleteBook(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await IdSchema.validate({ id }, { stripUnknown: true, abortEarly: false })

      const result = await Books.findByIdAndDelete(id)

      if (!result) {
        next(new NotFound('Book id not found'))
      }

      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default new BooksController()
