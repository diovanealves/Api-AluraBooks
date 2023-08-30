import { NextFunction, Request, Response } from 'express'
import { Books } from '../models/Book'
import { BookSchemaCreate, BookSchemaUpdate } from '../interface/BookInterface'
import { IdSchemaValidate } from '../interface/IdInterface'

class BooksController {
  async SearchAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Books.find().populate('author')
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async SearchById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await IdSchemaValidate.validate(
        { id },
        { stripUnknown: true, abortEarly: false },
      )

      const result = await Books.findById(id).populate('author')
      if (!result) return res.status(404).send('Specific Book Not Found')
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async SearchByAuthor(req: Request, res: Response, next: NextFunction) {
    const { author } = req.query
    try {
      const result = await Books.find({ author }).populate('author')
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async SearchByPublisher(req: Request, res: Response, next: NextFunction) {
    const { publisher } = req.query
    try {
      const result = await Books.find({ publisher }).populate('author')
      if (result.length === 0)
        return res
          .status(404)
          .send("Error when searching the publisher's books")
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
      await IdSchemaValidate.validate(
        { id },
        { stripUnknown: true, abortEarly: false },
      )

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
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  async DeleteBook(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      await IdSchemaValidate.validate(
        { id },
        { stripUnknown: true, abortEarly: false },
      )

      const result = await Books.findByIdAndDelete(id)
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

export default new BooksController()
