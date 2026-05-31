const express = require("express");
const router = express.Router();
const passport = require('passport');

router.use('/bookClub', require('./bookClubRoutes'));
router.use('/members', require('./membersRoutes'));

router.get('/login',
    /* #swagger.ignore = true */
    passport.authenticate('github')
);

router.get('/logout',
    /* #swagger.ignore = true */
    function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => { //we are manually storing the user in req.session.user, so even if passport logs out our session still has the user name saved unless this line is included.
            res.redirect('/');
        });        
    });
});

module.exports = router;