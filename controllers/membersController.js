const Members = require('../models/membersModel');

//Function to retrieve all members
const getAllMembers = async (req, res) => {
    try {
        //Use .find to find matching documnents in the Mongo collection, to narrow it down you would enter a condition in the parentheses
        const members = await Members.find();

        //200 means successful and data will be converted to JSON file
        res.status(200).json(members)
    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};


//Function to retrieve entry for single member
const getSingleMember = async (req, res) => {
    try {
        //Return a single document from Members where id matches the id from query parameter
        //Use findById function, it will pull the id from the route (params means values that are part of the URL path)
        const member = await Members.findById(req.params.id);

        //200 means successful and data will be converted to JSON file
        res.status(200).json(member)
            
    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

//Function to create new member
const createMember = async (req, res) => {
    try {
        const newMember = Members({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            lengthOfMembership: req.body.lengthOfMembership,
            hostedIn2026: req.body.hostedIn2026
        });
        //.save writes it into MongoDB
        const savedMember = await newMember.save();
        //201 means a new resource was created
        res.status(201).json(savedMember);
    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

//Function to update member entry
const updateMember = async (req, res) => {
    try {
        //Update an existing member entry using findByIdAndUpdate function
        const updatedMember = await Members.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } //new:true returns updated document, runValidators:true enforces schema rules
        );

        //Use an if statement to determine if member exists
        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found' });
        };

        //200 means successful and data will be converted to JSON file
        res.status(200).json(updatedMember);

    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

//Function to delete member
const deleteMember = async (req, res) => {
    try {
        //Delete an existing member using findByIdAndDelete function
        const deletedMember = await Members.findByIdAndDelete(req.params.id);

        //Use an if statement to determine if member exists
        if (!deletedMember) {
            return res.status(404).json({ message: 'Member not found' });
        };

        //Otherwise return success message
        res.status(200).json({ message: 'Member deleted successfully' });

    } catch (err) {
        //500 means server error
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllMembers,
    getSingleMember,
    createMember,
    updateMember,
    deleteMember
}