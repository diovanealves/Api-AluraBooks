import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import BookRoutes from './routes/Book.routes'
import AuthorRoutes from './routes/Author.routes'

dotenv.config()

const app = express()

mongoose
  .connect(`${process.env.MONGOOSE_URL}`)
  .then(() => {
    app.use(express.json())
    app.use(cors())

    app.use('/book', BookRoutes)
    app.use('/author', AuthorRoutes)

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server is running on port: ${process.env.PORT}`)
    })
  })
  .catch(() => console.log('❌ Error Connecting to Database'))
