//Imports
require('dotenv').config()
var express = require('express'),
    app = express(),
    path = require('path'),
    con = require('./database'),
    yes = require('yes-https'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require("connect-flash");

//Passport
passport.use('admin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pass',
        passReqToCallback: true
    },
    function(req, email, pass, done) {
        con.query("select * from admin where email=?", [email], function(err, rows) {
            if (err) return done(err);
            if (!rows.length) { return done(null, false, req.flash('loginMessage', 'No user found.')) }
            if (!(rows[0].password == pass))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, rows[0]);
        });
    }
));

passport.use('student', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pass',
        passReqToCallback: true
    },
    function(req, email, pass, done) {
        con.query("select * from aluno where email=?", [email], function(err, rows) {
            if (err) return done(err);
            if (!rows.length) { return done(null, false, req.flash('loginMessage', 'No user found.')) }
            if (!(rows[0].password == pass))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, rows[0]);
        });
    }
));

passport.use('teacher', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pass',
        passReqToCallback: true
    },
    function(req, email, pass, done) {
        con.query("select * from professor where email=?", [email], function(err, rows) {
            if (err) return done(err);
            if (!rows.length) { return done(null, false, req.flash('loginMessage', 'No user found.')) }
            if (!(rows[0].password == pass))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            return done(null, rows[0]);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.email);
});
passport.deserializeUser((email, done) => {
    role = email.split("@")[1]; 
    switch (role) {
        case 'email.com':
            con.query("select * from admin where email = ?", [email], function(err, rows) {
                done(err, rows[0]);
            });
        break;

        case 'alunos.fc.ul.pt':
            con.query("select * from aluno where email = ?", [email], function(err, rows) {
                done(err, rows[0]);
            });
        break;

        case 'fc.ul.pt':
            con.query("select * from professor where email = ?", [email], function(err, rows) {
                done(err, rows[0]);
            });
        break;
    }
});


app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'ptiptr2019', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(flash());
app.use(yes());
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

app.get("/searchStudentsByEmailOrNumber", (req, res) => {
    email = req.query.texto_pesquisa
    if (email.includes("@")) {
        sql = 'select * from aluno where email = ?';
    } else {
        sql = 'select * from aluno where numero_aluno = ?';
    }
    con.query(sql, [email], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

//Student Queries
app.get("/student-profile", (req, res) => {
    con.query('select * from aluno WHERE email = ?', ['aluno1@alunos.fc.ul.pt'], function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.put("/student-edit-profile", (req, res) => {

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

app.get("/subject-enroll", (req, res) => {
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

app.post("/authAdmin", passport.authenticate('admin', {
    successRedirect: '/admin',
    failureRedirect: '/errPage'
}));


app.post("/authTeacher", passport.authenticate('teacher', {
    successRedirect: '/teacher-dashboard',
    failureRedirect: '/errPage'
}));


app.post("/authStudent", passport.authenticate('student', {
    successRedirect: '/student-dashboard',
    failureRedirect: '/errPage'
}));

app.post("/auth", (req,res) => {
    email = req.body.email
    password = req.body.pass
    role = email.split("@")[1]; 
    
    switch (role) {
        case 'email.com':
            if (email && password) {
                res.redirect(307, "/authAdmin") 
            }
        break;

        case 'alunos.fc.ul.pt':
            if (email && password) {
                res.redirect(307, "/authStudent")
            }
            break;

        case 'fc.ul.pt':
            if (email && password) {
               res.redirect(307, "/authTeacher")
            }
            break;
    }
})


//Server
app.listen(process.env.port || 8080);
console.log('Running at Port 8080');