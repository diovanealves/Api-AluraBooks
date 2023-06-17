import express from 'express'
import BooksController from '../controllers/BookController'

const router = express.Router()

router.get('/', BooksController.SearchAll)

export default router
