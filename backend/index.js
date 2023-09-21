import express, { request } from "express"
import {port,mongodbURL}  from "./config.js"
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js"

const app = express();
app.use(express.json())
app.get('/',(reequest,response) =>{
    console.log(request)
    return response.status(200).send("home page")
})

// Route for Save a new Book
app.post('/books', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

mongoose.connect(mongodbURL)
        .then(()=>{
            console.log('mongodb connected');
            app.listen(port,() =>{
                console.log(`app running on port >> ${port}`);
        });
    })
        .catch((error) => {
            console.log(error);
        });