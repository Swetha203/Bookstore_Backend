import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

// environment
const PORT=process.env.PORT
const DATABASEHOST = process.env.DATABASEHOST
const DATABASENAME = process.env.DATABASENAME
const DB_PORT = process.env.DB_PORT
const MONGO_URI = `mongodb://${DATABASEHOST}:${DB_PORT}/${DATABASENAME}`

console.log(MONGO_URI)
const app = express();
// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);
console.log("entering on mongoose");

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  