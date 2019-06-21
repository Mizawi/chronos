var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');


//Home Page Route
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Admin Page Route
router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
});


//P-Dashboard Route
router.get('/teacher-dashboard', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/teacher-dashboard.html'));

});

//S-Dashboard Route
router.get('/student-dashboard', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/student-dashboard.html'));
});

router.get('/logout', function(req, res) {
    req.logout();
    if (!req.isAuthenticated()) {
        res.redirect('/admin');
    }
});


module.exports = router;