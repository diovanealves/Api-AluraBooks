import express from 'express'
import AuthorController from '../controllers/AuthorController'

const router = express.Router()

router
  .get('/', AuthorController.SearchAll)
  .get('/:id/', AuthorController.SearchById)
  .post('/', AuthorController.CreateAuthor)
  .put('/:id/', AuthorController.EditAuthor)
  .delete('/:id/', AuthorController.DeleteAuthor)

export default router
