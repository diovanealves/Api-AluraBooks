import { Request, Response } from 'express'
import { Author } from '../models/Author'
import {
  AuthorSchemaCreate,
  AuthorSchemaUpdate,
} from '../interface/AuthorInterface'

class AuthorController {
  async SearchAll(req: Request, res: Response) {
    try {
      const result = await Author.find()
      res.status(200).json(result)
    } catch (err) {
      res.status(404).send('Author Not Found')
    }
  }

  async SearchById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await Author.findById(id)
      if (!result) return res.status(404).send('Author Specify Not Found')
      res.status(200).json(result)
    } catch (err) {
      res.status(404).send('Author Specify Not Found')
    }
  }

  async CreateAuthor(req: Request, res: Response) {
    const { name, nationality } = AuthorSchemaCreate.parse(req.body)
    try {
      await Author.create({ name, nationality })
      res.status(200).send('Success In Creating an Author')
    } catch (err) {
      res.status(500).send('Error When Creating The Author')
    }
  }

  async EditAuthor(req: Request, res: Response) {
    const { id } = req.params
    const { name, nationality } = AuthorSchemaUpdate.parse(req.body)
    try {
      const updateDate = { name, nationality }
      await Author.findByIdAndUpdate(id, { $set: updateDate })
      res.status(200).send('Author successfully edited')
    } catch (err) {
      res.status(404).send('No specific author found')
    }
  }

  async DeleteAuthor(req: Request, res: Response) {
    const { id } = req.params
    try {
      await Author.findByIdAndDelete(id)
      res.status(200).send('Author Successfully Deleted')
    } catch (err) {
      res.status(404).send('Specific Author Not Found')
    }
  }
}

export default new AuthorController()
