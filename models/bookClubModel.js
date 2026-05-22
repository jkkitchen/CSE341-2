const mongoose = require('mongoose');

const bookClubSchema = new mongoose.Schema({
    month: String,
    host: String,
    bookTitle: String,
    bookAuthor: String
});

const BookClub = mongoose.model('BookClub', bookClubSchema);

module.exports = BookClub;