import { Request, Response } from 'express'
import { Books } from '../models/Book'
import { BookSchemaCreate, BookSchemaUpdate } from '../interface/BookInterface'

class BooksController {
  async SearchAll(req: Request, res: Response) {
    try {
      const result = await Books.find().populate('author')
      res.status(200).json(result)
    } catch (err) {
      res.status(404).send('Books Not Found')
    }
  }

  async SearchById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await Books.findById(id).populate('author')
      if (!result) return res.status(404).send('Specific Book Not Found')
      res.status(200).json(result)
    } catch (err) {
      res.status(404).send('Specific Book Not Found')
    }
  }

  async SearchByAuthor(req: Request, res: Response) {
    const { author } = req.query
    try {
      const result = await Books.find({ author }).populate('author')
      res.status(200).json(result)
    } catch (err) {
      res.status(404).send('Error When Searching For Books By This Author')
    }
  }

  async SearchByPublisher(req: Request, res: Response) {
    const { publisher } = req.query
    try {
      const result = await Books.find({ publisher }).populate('author')
      if (result.length === 0)
        return res
          .status(404)
          .send("Error when searching the publisher's books")
      res.status(200).json(result)
    } catch (err) {
      res.status(404).send("Error when searching the publisher's books")
    }
  }

  async CreateBook(req: Request, res: Response) {
    const { title, description, author, publisher } = BookSchemaCreate.parse(
      req.body,
    )
    try {
      await Books.create({ title, description, author, publisher })
      res.status(200).send('Success in book creation')
    } catch (err) {
      res.status(500).send('Error When Creating The Book')
    }
  }

  async EditBook(req: Request, res: Response) {
    const { id } = req.params
    const { title, description, author, publisher } = BookSchemaUpdate.parse(
      req.body,
    )
    try {
      const updateData = { title, description, author, publisher }
      await Books.findByIdAndUpdate(id, { $set: updateData })
      res.status(200).send('Changes made successfully')
    } catch (err) {
      res.status(404).send('Specific Book Not Found')
    }
  }

  async DeleteBook(req: Request, res: Response) {
    const { id } = req.params
    try {
      await Books.findByIdAndDelete(id)
      res.status(200).send('Success in deleting the Book')
    } catch (err) {
      res.status(404).send('Error when deleting the Book')
    }
  }
}

export default new BooksController()
