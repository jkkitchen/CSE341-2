const express = require("express");
const bookClubRouter = express.Router();
const {
    getAllBookClubMonths,
    getOneBookClubMonth,
    createBookClubMonth,
    updateBookClubMonth,
    deleteBookClubMonth
} = require('../controllers/bookClubController');
const { bookClubValidationRules, validate } = require('../middleware/validator')

//GET route for all book club months
bookClubRouter.get('/', getAllBookClubMonths);

//GET route for single book club entry
bookClubRouter.get('/:id', getOneBookClubMonth);

//POST route to create new book club entry
bookClubRouter.post(
    '/',
    bookClubValidationRules(),
    validate,
    createBookClubMonth);

//PUT route to update a book club entry
bookClubRouter.put('/:id',
    /* To ensure that the PUT route in api-docs has a body space for updates
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated book club information',
            required: true,
            schema: {
                month: 'January - December',
                host: 'any',
                bookTitle: 'any',
                bookAuthor: 'any'
            }
        }
    */
    bookClubValidationRules(),
    validate,
    updateBookClubMonth);

//DELETE route to delete a book club entry
bookClubRouter.delete('/:id', deleteBookClubMonth);

module.exports = bookClubRouter;