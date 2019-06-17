var router = require('express').Router();
var passport = require('../passport-setup');


router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get("/google/admin",passport.authenticate('google'), (req,res) =>{

    res.send('log on');
});


module.exports = router;