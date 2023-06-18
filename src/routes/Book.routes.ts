import express from 'express'
import BooksController from '../controllers/BookController'

const router = express.Router()

router
  .get('/', BooksController.SearchAll)
  .get('/:id', BooksController.SearchById)
  .get('/author/search', BooksController.SearchByAuthor)
  .get('/publisher/search', BooksController.SearchByPublisher)
  .post('/', BooksController.CreateBook)
  .put('/:id', BooksController.EditBook)
  .delete('/:id', BooksController.DeleteBook)

export default router
