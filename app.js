import express from 'express';
import bodyParser from 'body-parser';
import {
    connectDB,
    allBooks,
    addBook,
    getBook,
    updateBook,
    deleteBook
} from './db/db.js';

connectDB();

const app = express();
const bookRouter = express.Router();

//parse json in the request body
app.use(bodyParser.json());

// Use the bookRouter for all routes starting with /api/books
app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
    res.send('APIs are up and running');
});

//route to get all the books
bookRouter.get('/', async (req, res) => {
    allBooks()
        .then(books => res.send(books))
        .catch(error => res.send(error));
});

//route to add a new book
bookRouter.post('/', (req, res) => {

    const { title, author, summary } = req.body;

    // Check if any required fields are missing
    if (!title || !author || !summary) {
        return res.status(400).send({ message: 'Missing required fields: title, author, summary' });
    }

    //generate a random 10 digit number for book ID
    const id = Math.floor(Math.random() * (Math.pow(10, 10) - Math.pow(10, 9))) + Math.pow(10, 9);

    const bookDetails = {
        id,
        title,
        author,
        summary
    };

    addBook(bookDetails)
        .then(message => res.send(message))
        .catch(error => res.send(error));
});

//route to get a book's details by its ID
bookRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    getBook(id)
        .then(book => res.send(book))
        .catch(error => {
            if (error.message === 'Book not found') {
                res.status(404).send({ message: 'Book not found' });
            } else {
                res.status(500).send({ message: 'Error updating book' });
            }
        });
});

//route to update a book's details by its ID
bookRouter.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    // Check if the request body is empty
    if (Object.keys(updatedFields).length === 0) {
        return res.status(400).send({ message: 'No fields to update provided' });
    }

    updateBook(id, updatedFields)
        .then(message => res.send(message))
        .catch(error => {
            if (error.message === 'Book not found') {
                res.status(404).send({ message: 'Book not found' });
            } else {
                res.status(500).send({ message: 'Error updating book' });
            }
        });
});

//route to delete a book by its ID
bookRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    deleteBook(id)
        .then(message => res.send(message))
        .catch(error => {
            if (error.message === 'Book not found') {
                res.status(404).send({ message: 'Book not found' });
            } else {
                res.status(500).send({ message: 'Error updating book' });
            }
        });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});