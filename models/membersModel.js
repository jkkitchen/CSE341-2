const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    address: String,
    lengthOfMembership: Number,
    hostedIn2026: Boolean
});

//Third entry is the name of the collection on MongoDB
const Members = mongoose.model('Members', membersSchema, 'book_club_members');

module.exports = Members;