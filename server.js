//Imports
require('dotenv').config()
var express = require('express')
, app = express()
, path = require('path')
, con = require('./database')
, yes = require('yes-https')
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, flash=require("connect-flash");
app.use(flash());

//Passport
passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'pass',
    passReqToCallback : true 
},
function(req, email, pass, done) {
     con.query("select * from admin where email=?", [email],function(err,rows){
        if (err) return done(err);
        if (!rows.length) {return done(null, false, req.flash('loginMessage', 'No user found.'))} 
        if (!( rows[0].password == pass))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
        return done(null, rows[0]);			
    });
}));

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'ptiptr2019', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    con.query("select * from admin where id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});

app.use(yes());

//Routing
app.use(express.static(path.join(__dirname, '/views')));
app.use(require('./routes'));

//Querying
//Admin Queries
app.get("/searchAll", (req, res) => {
    sql = 'select * from admin;select * from aluno; select * from professor';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})
app.get("/searchTeacher", (req, res) => {
    sql = 'select * from professor';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.get("/searchStudent", (req, res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//Student Queries
app.get("/student-profile", (req, res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.get("/student-subject", (req, res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.get("/student-schedule", (req, res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})
app.get("/subject-enroll", (req,res, user) => {
    con.query("select name from admin where email=?", [user.email], (err, result) => {
        console.log(result)
    })
})

//Server Functions

//Login

app.post("/authAdmin", passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/errPage'
}));


app.post("/authTeacher", passport.authenticate('local', {
    successRedirect: '/teacher-dashboard',
    failureRedirect: '/errPage'
}));


app.post("/authStudent", passport.authenticate('local', {
    successRedirect: '/student-dashboard',
    failureRedirect: '/errPage'
}));



//Server
app.listen(process.env.port || 8080);
console.log('Running at Port 8080');