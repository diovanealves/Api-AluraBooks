import express from 'express'
import BooksController from '../controllers/BookController'

const router = express.Router()

router
  .get('/', BooksController.SearchAll)
  .get('/:id', BooksController.SearchById)
  .get('/publisher/search', BooksController.SearchByFilter)
  .post('/', BooksController.CreateBook)
  .put('/:id', BooksController.EditBook)
  .delete('/:id', BooksController.DeleteBook)

export default router
