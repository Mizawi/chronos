var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');


//Home Page Route
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

//Admin Page Route
router.get('/admin', (req,res) => {
    if(req.isAuthenticated()){
        if(req.user.email.split("@")[1] == 'email.com'){
            res.sendFile(path.join(__dirname, '../views/admin.html'));
        }else if(req.user.email.split("@")[1] == 'alunos.fc.ul.pt'){
            res.redirect('/student-dashboard');
        }else if(req.user.email.split("@")[1] == 'fc.ul.pt'){
            res.redirect('/teacher-dashboard');
        }
    }
});

//Error Page Route
router.get('/errPage', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/errPage.html'));
});

//P-Dashboard Route
router.get('/teacher-dashboard', function(req, res) {
    if(req.isAuthenticated()){
        if(req.user.email.split("@")[1] == 'email.com'){
            res.redirect('/admin');
        }else if(req.user.email.split("@")[1] == 'alunos.fc.ul.pt'){
            res.redirect('/student-dashboard');
        }else if(req.user.email.split("@")[1] == 'fc.ul.pt'){
            res.sendFile(path.join(__dirname, '../views/teacher-dashboard.html'));
        }
    }

});

//S-Dashboard Route
router.get('/student-dashboard', function(req, res) {
    if(req.isAuthenticated()){
        if(req.user.email.split("@")[1] == 'email.com'){
            res.redirect('/admin');
        }else if(req.user.email.split("@")[1] == 'alunos.fc.ul.pt'){
            res.sendFile(path.join(__dirname, '../views/student-dashboard.html'));
        }else if(req.user.email.split("@")[1] == 'fc.ul.pt'){
            res.redirect('/teacher-dashboard');
        }
    }
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = router;