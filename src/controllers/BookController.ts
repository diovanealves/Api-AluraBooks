import { Request, Response } from 'express'
import { Books } from '../models/Book'

class BooksController {
  async SearchAll(req: Request, res: Response) {
    try {
      const result = await Books.find()
      res.status(200).json(result)
    } catch (err) {
      res.status(404).json({ message: 'Books Not Found' })
    }
  }

  async SearchById(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await Books.findById(id)
      if (!result)
        return res.status(404).json({ message: 'Specific Book Not Found' })
      res.status(200).json(result)
    } catch (err) {
      res.status(404).json({ message: 'Specific Book Not Found' })
    }
  }
}

export default new BooksController()
