import express from 'express'
import BooksController from '../controllers/BookController'

const router = express.Router()

router
  .get('/', BooksController.SearchAll)
  .get('/:id', BooksController.SearchById)
  .post('/', BooksController.CreateBook)
  .put('/:id', BooksController.EditBook)

export default router
