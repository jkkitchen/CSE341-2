const express = require("express");
const membersRouter = express.Router();
const {
    getAllMembers,
    getSingleMember,
    createMember,
    updateMember,
    deleteMember
} = require('../controllers/membersController');
const { memberValidationRules, validate } = require('../middleware/validator')
const { isAuthenticated } = require("../middleware/authenticate");
/* #swagger.tags = ['Members'] */ //Need these so api-docs will generate routes correctly

//GET route for all members
membersRouter.get('/', isAuthenticated, getAllMembers);
/* #swagger.path = '/members' */

//GET route for single member
membersRouter.get('/:id', isAuthenticated, getSingleMember);
/* #swagger.path = '/members/{id}' */

//POST route to create new member
membersRouter.post(
    '/',
    isAuthenticated,
    memberValidationRules(),
    validate,
    createMember);
/* #swagger.path = '/members' */

//PUT route to update a member
membersRouter.put('/:id',
    /* To ensure that the PUT route in api-docs has a body space for updates
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Updated member information',
            required: true,
            schema: {
                firstName: 'any',
                lastName: 'any',
                email: 'any@any.com',
                phoneNumber: 'any',
                address: 'any',
                lengthOfMembership: 'number',
                hostedIn2026: 'true/false'
            }
        }
    */
    isAuthenticated,
    memberValidationRules(),
    validate,
    updateMember);
/* #swagger.path = '/members/{id}' */

//DELETE route to delete a member
membersRouter.delete('/:id', isAuthenticated, deleteMember);
/* #swagger.path = '/members/{id}' */

module.exports = membersRouter;