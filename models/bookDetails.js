import mongoose from "mongoose";

const bookDetailsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    author: String,
    summary: String
});

const Book = mongoose.model('Book', bookDetailsSchema);

export default Book;