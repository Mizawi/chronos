var router = require('express').Router();
var passport = require('../passport-setup');


router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get("/google/redirect", passport.authenticate('google'), (req, res) => {

    switch (req.user.email.split("@")[1]) {
        case 'email.com':
            res.redirect("/admin")
        break;

        case 'alunos.fc.ul.pt':
            res.redirect("/student-dashboard")
        break;

        case 'fc.ul.pt':
            res.redirect("/teacher-dashboard")
        break;

        default:
            res.redirect("/?error=1")
        break;
    }
});


module.exports = router;