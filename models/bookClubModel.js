const mongoose = require('mongoose');

const bookClubSchema = new mongoose.Schema({
    month: String,
    host: String,
    bookTitle: String,
    bookAuthor: String
});

//Third entry is the name of the collection on MongoDB
const BookClub = mongoose.model('BookClub', bookClubSchema, 'book_club');

module.exports = BookClub;