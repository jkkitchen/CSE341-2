const BookClub = require('../models/bookClubModel');

//Function to retrieve all book club data
const getAllBookClubMonths = async (req, res) => {
    try {
        //Use .find to find matching documnents in the Mongo collection, to narrow it down you would enter a condition in the parentheses
        const bookClub = await BookClub.find();

        //200 means successful and data will be converted to JSON file
        res.status(200).json(bookClub)
    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};


//Function to retrieve one month of book club data
const getOneBookClubMonth = async (req, res) => {
    try {
        //Return a single document from bookClub where id matches the id from query parameter
        //Use findById function, it will pull the id from the route (params means values that are part of the URL path)
        const bookClub = await BookClub.findById(req.params.id);

        //200 means successful and data will be converted to JSON file
        res.status(200).json(bookClub)
            
    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

//Function to create book club entry
const createBookClubMonth = async (req, res) => {
    try {
        const newBookClubMonth = BookClub({
            month: req.body.month,
            host: req.body.host,
            bookTitle: req.body.bookTitle,
            bookAuthor: req.body.bookAuthor
        });
        //.save writes it into MongoDB
        const savedBookClubMonth = await newBookClubMonth.save();
        //201 means a new resource was created
        res.status(201).json(savedBookClubMonth);
    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

//Function to update book club entry
const updateBookClubMonth = async (req, res) => {
    try {
        //Update an existing book club entry using findByIdAndUpdate function
        const updatedBookClub = await BookClub.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } //new:true returns updated document, runValidators:true enforces schema rules
        );

        //Use an if statement to determine if book club data exists
        if (!updatedBookClub) {
            return res.status(404).json({ message: 'Book Club monthly data not found' });
        };

        //200 means successful and data will be converted to JSON file
        res.status(200).json(updatedBookClub);

    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

//Function to delete book club entry
const deleteBookClubMonth = async (req, res) => {
    try {
        //Delete an existing book club entry using findByIdAndDelete function
        const deletedBookClubMonth = await BookClub.findByIdAndDelete(req.params.id);

        //Use an if statement to determine if book club entry exists
        if (!deletedBookClubMonth) {
            return res.status(404).json({ message: 'Book Club monthly data not found' });
        };

        //Otherwise return success message
        res.status(200).json({ message: 'Book Club monthly data deleted successfully' });

    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBookClubMonths,
    getOneBookClubMonth,
    createBookClubMonth,
    updateBookClubMonth,
    deleteBookClubMonth
}