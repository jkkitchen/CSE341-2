const express = require("express");
const bookClubRouter = express.Router();
const {
    getAllBookClubMonths,
    getOneBookClubMonth,
    createBookClubMonth,
    updateBookClubMonth,
    deleteBookClubMonth
} = require('../controllers/bookClubController');
const { bookClubValidationRules, validate } = require('../middleware/validator');
const { isAuthenticated } = require("../middleware/authenticate");
/* #swagger.tags = ['BookClub'] */ //Need these so the correct routes will generate on api-docs

//GET route for all book club months
bookClubRouter.get('/', getAllBookClubMonths);
/* #swagger.path = '/bookClub' */

//GET route for single book club entry
bookClubRouter.get('/:id', getOneBookClubMonth);
/* #swagger.path = '/bookClub/{id}' */

//POST route to create new book club entry
bookClubRouter.post(
    '/',
    isAuthenticated,
    bookClubValidationRules(),
    validate,
    createBookClubMonth);
/* #swagger.path = '/bookClub' */

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
    isAuthenticated,
    bookClubValidationRules(),
    validate,
    updateBookClubMonth);
/* #swagger.path = '/bookClub/{id}' */

//DELETE route to delete a book club entry
bookClubRouter.delete('/:id', isAuthenticated, deleteBookClubMonth);
/* #swagger.path = '/bookClub/{id}' */

module.exports = bookClubRouter;