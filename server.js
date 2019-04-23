//Imports
require('dotenv').config()
var express = require('express')
, app = express()
, path = require('path')
, con = require('./database')
, bodyParser = require('body-parser')
, yes = require('yes-https')
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

//Passport
passport.use(new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true 
}, (req, email, password, done) => {
    connection.query("SELECT * FROM admin WHERE email=?" + email + "'", (err,rows) => {
        if (err) return done(err);
        if (!rows.length) {return done(null, false, req.flash('loginMessage', 'No user found.'))} 
       
        if (!( rows[0].password == password))
           return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
       
        return done(null, rows[0]);   
})}));

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'ptiptr2019', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

app.use(yes());

//Routing
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get("/subject-enroll", (req,res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//Teacher queries
app.get("/teacher-profile", (req, res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/teacher-subject", (req, res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/teacher-request", (req, res) => {
    sql = 'select * from aluno';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//Server Functions
//Login
app.post('/auth', passport.authenticate('local', { failureRedirect: '/' }),(req, res) => {
    var email = req.query.email;
    var password = req.query.pass;
    var role = email.split("@")[1];
    console.log(user.id);
 

    switch (role) {
        case 'email.com':
            if (email && password) {
                con.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], function(err, result) {
                    if (err) throw err;
                    if (result.length > 0) { res.redirect('/admin') } else { res.redirect('/errPage') }
                    res.end()
                });
            }
            break;

        case 'alunos.fc.ul.pt':
            if (email && password) {
                con.query('SELECT * FROM aluno WHERE email = ? AND password = ?', [email, password], function(err, result) {
                    if (err) throw err;
                    if (result.length > 0) { res.redirect('/student-dashboard') } else { res.redirect('/errPage') }
                    res.end()
                });
            }
            break;

        case 'fc.ul.pt':
            if (email && password) {
                con.query('SELECT * FROM professor WHERE email = ? AND password = ?', [email, password], function(err, result) {
                    if (err) throw err;
                    if (result.length > 0) { res.redirect('/teacher-dashboard') } else { res.redirect('/errPage') }
                    res.end()
                });
            }
            break;
    }
});

//Server
app.listen(process.env.port || 8080);
console.log('Running at Port 8080');