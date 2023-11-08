import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/bookDetails.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

//connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw error;
    }
};


//get all the books and return the data
const allBooks = async () => {
    try {
        const books = await Book.find({}, { _id: 0, __v: 0 });
        return books;
    } catch (error) {
        throw error;
    }
};

//add new book and return the success or error message
const addBook = async (bookDetails) => {
    try {
        const newBook = new Book(bookDetails);
        await newBook.save();
        return 'Book added successfully';
    } catch (error) {
        throw new Error('Error adding book');
    }
};

//get a book's details by its ID and return the data
const getBook = async (id) => {
    try {
        const book = await Book.findOne({ id: id }, { _id: 0, __v: 0 });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    } catch (error) {
        throw new Error('Error fetching book');
    }
};

//update a book's details by its ID and return the success or error message
const updateBook = async (id, updatedFields) => {
    try {
        const book = await Book.findOneAndUpdate({ id: id }, updatedFields, { new: true });
        if (!book) {
            throw new Error('Book not found');
        }
        return 'Book updated successfully';
    } catch (error) {
        throw new Error('Error updating book');
    }
};

//delete a book by its ID and return the success or error message
const deleteBook = async (id) => {
    try {
        const book = await Book.findOneAndDelete({ id: id });
        if (!book) {
            throw new Error('Book not found');
        }
        return 'Book deleted successfully';
    } catch (error) {
        throw new Error('Error deleting book');
    }
}

export { connectDB, allBooks, addBook, getBook, updateBook, deleteBook };