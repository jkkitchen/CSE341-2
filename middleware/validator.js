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
            .withMessage('Month is required'),

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
    validate
}