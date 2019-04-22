//Imports
require('dotenv').config()
var express = require('express');
var app = express();
var path = require('path');
const con = require('./database');
var bodyParser = require('body-parser');
const yes = require('yes-https');



app.use(yes());

//Routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/views')));
app.use(require('./routes'));




//Querying
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

//Server Functions

//Login
app.get('/auth', (req, res, session) => {
    var email = req.query.email;
    var password = req.query.pass;
    var role = email.split("@")[1];

    console.log(req.sessionStore);

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