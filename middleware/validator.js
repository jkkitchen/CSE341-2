const { body, validationResult } = require('express-validator');

//List of months to be used in validation rules for 'month'
const validMonths = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];

//Validation Rules for book club entries
const bookClubValidationRules = () => {
    return [
        body('month')
            .notEmpty()
            .isString()
            .trim()
            .isIn(validMonths)
            .withMessage('Month is required and must be January - December'),

        body('host')
            .notEmpty()
            .isString()
            .trim()
            .withMessage('Host name is required'),

        body('bookTitle')
            .notEmpty()
            .isString()
            .trim()
            .withMessage('Book Title is required'),

        body('bookAuthor')
            .notEmpty()
            .isString()
            .trim()
            .withMessage('Book Author is required')
    ]
};

const memberValidationRules = () => {
    return [    
        body('firstName')
            .notEmpty()
            .isString()
            .trim()
            .withMessage('First name is required'),
        body('lastName')
            .notEmpty()
            .isString()
            .trim()
            .withMessage('Last name is required'),
        body('email')
            .notEmpty()
            .isEmail()
            .normalizeEmail()
            .withMessage('Valid email is required'),
        body('phoneNumber')
            .notEmpty()
            .isString()
            .trim()
            .withMessage('Phone number is required, format XXX-XXX-XXXX'),
        body('address')
            .notEmpty()
            .isString()
            .trim()
            .withMessage('Address is required'),
        body('lengthOfMembership')
            .notEmpty()
            .isInt()
            .withMessage('Length of membership is required'),
        body('hostedIn2026')
            .notEmpty()
            .isBoolean()
            .withMessage('Hosted in 2026 is required and must be true or false')
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    bookClubValidationRules,
    memberValidationRules,
    validate
}