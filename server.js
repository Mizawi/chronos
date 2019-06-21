//Imports
require('dotenv').config()
var express = require('express'),
    app = express(),
    path = require('path'),
    con = require('./database'),
    yes = require('yes-https'),
    flash = require("connect-flash");
authRoutes = require('./routes/authRoutes');

const passportSetup = ('./passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport')
app.use(require('./routes'));
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['ptiptr2019']
}))

app.use(passport.initialize());
app.use(passport.session())


app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'ptiptr2019', resave: true, saveUninitialized: true }));
app.use(express.json());
app.use(flash());
app.use(yes());
app.use(express.static(path.join(__dirname, '/views')));
app.use('/auth', authRoutes);



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

app.get("/searchByEmailOrNumber", (req, res) => {
    input = req.query.texto_pesquisa
    if (input.includes("@")) {
        sql = 'select * from aluno where email = ?; select * from professor where email = ?';
    } else {
        sql = 'select * from aluno where numero_aluno = ?; select * from professor where numero_prof = ?';
    }
    con.query(sql, [input, input], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/getLogs", (req, res) => {
    sql = 'select * from logs';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/adminSettings", (req, res) => {
    res.send({ status: 'Changes has been saved' });
})

app.post("/adminCreateStudent", (req, res) => {
    var nome = req.body.aluno_nome;
    var numero = req.body.aluno_numero;
    var curso = req.body.aluno_curso;

    if (nome.length > 0 && numero.length > 0) {
        var email = "fc" + numero + "@alunos.fc.ul.pt";
        var informacao = `'{"nome": "${nome}" , "sexo": " ", "cargo": "Aluno", "emailp": " ", "morada": " ", "numero": "${numero}", "valido": " ", "emitidoEm": " ", "profissao": " ", "estadoCivil": " ", "contribuinte": " ", "nacionalidade": " ", "dataNascimento": " ", "localdeEmissao": " ", "nomeUtilizador": "fc${numero}", "concelhoNascimento": " ", "distritoNascimento": " ", "freguesiaNascimento": " ", "documentoDeIdentificacao": " "}'`;
        sql = `insert into aluno (email,information,password,cadeiras,numero_aluno, curso, ano) VALUES ("${email}",${informacao},"123",'{}',${numero},${curso},0)`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send({ code: 1, msg: "Student has been created" });
        })
    } else {
        res.send({ code: 0, msg: "Fill all fields before create" });
    }
})

app.post("/adminCreateProf", (req, res) => {
    var nome = req.body.prof_nome;
    var numero = req.body.prof_numero;

    if (nome.length > 0 && numero.length > 0) {
        var email = "prof" + numero + "@fc.ul.pt";
        var informacao = `'{"nome": "${nome}" , "sexo": " ", "cargo": "Docente", "email_p": " ", "morada": " ", "numero": "${numero}", "valido": " ", "emitidoEm": " ", "profissao": " ", "estadoCivil": " ", "contribuinte": " ", "nacionalidade": " ", "dataNascimento": " ", "localdeEmissao": " ", "nomeUtilizador": "prof${numero}", "concelhoNascimento": " ", "distritoNascimento": " ", "freguesiaNascimento": " ", "documentoDeIdentificacao": " "}'`;
        sql = `insert into professor (email,information,password,numero_prof, cadeiras_teacher) VALUES ("${email}",${informacao},"123",${numero},'{}')`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send({ code: 1, msg: "Professor has been created" });
        })
    } else {
        res.send({ code: 0, msg: "Fill all fields before create" });
    }
})

//Student Queries
app.get("/student-profile", (req, res) => {
    con.query('select * from aluno WHERE email = ?', [user.email], function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.put("/student-edit-profile", (req, res) => {

})

app.get("/student-subject", (req, res) => {
    con.query('select * from aluno WHERE email = ?', [user.email], function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/session-info", (req, res) => {
    role = user.email.split("@")[1];
    switch (role) {
        case 'alunos.fc.ul.pt':
            con.query("select * from aluno where email = ?", [user.email], function(err, result) {
                res.send(result);
            });
            break;

        case 'fc.ul.pt':
            con.query("select * from professor where email = ?", [user.email], function(err, result) {
                res.send(result);
            });
            break;
    }
})

app.get("/student-schedule", (req, res) => {
    sql = 'select cadeiras from aluno where email=?';
    con.query(sql, [user.email], (err, result) => {
        if (err) throw err;
        cadeiras = JSON.parse(result[0].cadeiras);
        for (key in cadeiras) {
            if (cadeiras[key] == "concluido") {
                delete cadeiras[key];
            }
        }
        sql = 'select nome, horario from cadeiras';
        con.query(sql, (err, result) => {
            if (err) throw err;
            for (k in cadeiras) {
                for (i in result) {
                    if (k == result[i].nome) {
                        for (key in JSON.parse(result[i].horario)) {
                            if (cadeiras[k] == key) {
                                cadeiras[k] = ['T', JSON.parse(result[i].horario)['T'], cadeiras[k], JSON.parse(result[i].horario)[key]];
                            }
                        }
                    }
                }
            }
            res.send(cadeiras);
        })
    })
})

app.get("/subject-enroll", (req, res) => {
    sql = 'select cadeiras, curso, ano from aluno where email=?';
    con.query(sql, [user.email], (err, result) => {
        if (err) throw err;
        aluno_cadeiras = JSON.parse(result[0].cadeiras);
        aluno_curso = JSON.parse(result[0].curso);
        aluno_ano = JSON.parse(result[0].ano);

        con.query('select nome, horario from cadeiras where curso=? and ano=?', [aluno_curso, aluno_ano], (err, result) => {
            if (err) throw err;

            var cadeiras_insc = []
            for (i = 0; i < result.length; i++) {
                if (result[i].nome in aluno_cadeiras) {} else {
                    cadeiras_insc.push({
                        key: result[i].nome,
                        value: result[i].horario
                    });
                }
            }
            res.send(cadeiras_insc);

        })
    })
})

app.get("/fetchForChange", (req, res) => {
    con.query('select cadeiras from aluno WHERE email = ?', [user.email], function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/fetchTurnosCadeira", (req, res) => {
    const cadeira = req.query.cadeira;
    con.query('select horario from cadeiras WHERE nome = ?', [cadeira], function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/studentRequest", (req, res) => {
    const cadeira = req.query.cadeira;
    const turnoin = req.query.turnoin;
    const turnojoin = req.query.turnojoin;

    con.query('insert into pedidos (numero_aluno, cadeira, turnosaida, turnoentrada) values (?,?,?,?)', [req.user.numero_aluno, cadeira, turnoin, turnojoin], function(err, result) {
        if (err) throw err;
        res.send({ code: 1, msg: "Your request is now under approval" });
    })
})


//Teacher queries
app.get("/teacher-profile", (req, res) => {
    con.query('select * from professor WHERE email = ?', [user.email], function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/teacher-fetch", (req, res) => {
    const student = req.query.student;
    const numero_prof = JSON.parse(user.email);

    sql = 'select cadeiras from aluno where numero_aluno = ?;select cadeiras_teacher from professor where numero_prof = ?;';

    con.query(sql, [student, numero_prof], (err, result) => {
        if (result[0].length > 0 && result[1].length > 0) {
            let cadeirasin = Object.keys(JSON.parse(result[0][0].cadeiras));
            let subjects = Object.keys(JSON.parse(result[1][0].cadeiras_teacher));

            let matched = [];
            subjects.forEach(subj => {
                cadeirasin.forEach(cad => {
                    if (subj == cad) {
                        matched.push(subj);
                    }
                })
            })
            res.send({ code: 1, matched: matched, subjects: subjects })
        } else {
            res.send({ code: 0 })
        }

    })

})

app.get("/teacher-fetch-classes", (req, res) => {
    const student = req.query.student;
    const subject = req.query.subject;
    sql = `SELECT cadeiras from aluno where numero_aluno = ${student}; select horario from cadeiras where nome='${subject}'`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        let turnoatual = '';
        const turno = JSON.parse(result[0][0].cadeiras)[subject];
        turnoatual = turno;

        let turnoscadeira = '';
        const turnos = Object.keys(JSON.parse(result[1][0].horario));
        turnoscadeira = turnos.filter(x => x != "T");

        res.send({ code: 1, turnoatual: turnoatual, turnoscadeira: turnoscadeira })
    })
})

app.get("/teacher-transfer", (req, res) => {
    const student = req.query.student;
    const subject = req.query.subject;
    const removefrom = req.query.removefrom;
    const addto = req.query.addto;

    if (student.length > 0 && subject.length > 0 && removefrom.length > 0 && addto.length > 0) {
        sql = 'select cadeiras from aluno where numero_aluno = ?;';

        con.query(sql, [student], (err, result) => {
            if (err) throw err;
            turnosatuais = JSON.parse(result[0].cadeiras)[subject];
            turnosnovos = turnosatuais.filter(turno => turno != removefrom);
            turnosnovos.push(addto);
            cadeiras = JSON.parse(result[0].cadeiras);
            cadeiras[subject] = turnosnovos;

            res.send(cadeiras);
        })
    } else {
        res.send({ msg: "Fill all fields before transfer", code: 0 });
    }
})

app.get("/teacher-transfer-set", (req, res) => {
    const student = req.query.student;
    const cadeiras = req.query.cadeiras;
    const newinfo = JSON.stringify(cadeiras);
    sql = `UPDATE aluno SET cadeiras = '${newinfo}' WHERE numero_aluno = ${student};`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ msg: "Student classes changed successfully" });
    })
})

app.get("/teacherReject", (req, res) => {
    const requestid = req.query.requestid;
    sql = `delete from pedidos where id=?`;
    con.query(sql, [requestid], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, msg: "Request rejected" });
    })
})

app.get("/teacherApprove", (req, res) => {
    const requestid = req.query.requestid;
    sql = `delete from pedidos where id=?`;
    con.query(sql, [requestid], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, msg: "Request approved" });
    })
})

app.get("/teacher-show", (req, res) => {
    const subject = req.query.subject;
    sql = `select email, numero_aluno from aluno where JSON_EXTRACT(cadeiras , '$.${subject}') IS NOT NULL;`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get("/teacher-request", (req, res) => {
    sql = 'select * from pedidos; select cadeiras_teacher from professor where email = ?';
    con.query(sql, [user.email], (err, result) => {
        if (err) throw err;
        const cadeiras = Object.keys(JSON.parse(result[1][0].cadeiras_teacher));
        const requests = [];
        result[0].forEach(row => {
            if (cadeiras.includes(row.cadeira) && JSON.parse(result[1][0].cadeiras_teacher)[row.cadeira] == "regente") {
                requests.push(row);
            }
        })

        if (requests.length > 0) {
            res.send({ code: 1, requests: requests, msg: "You have pending requests" });
        } else {
            res.send({ code: 0, requests: requests, msg: "You do not have pending requests" });
        }
    })
})

app.post("/subject-enroll-submit", (req, res) => {
    con.query("select * from aluno where email = ?", [user.email], function(err, result) {
        cadeiras = JSON.parse(result[0].cadeiras)
        cadeiras[req.body.subject] = [req.body.turno]
        sql = `UPDATE aluno SET cadeiras = ? WHERE email = ?`;
        con.query(sql, [JSON.stringify(cadeiras), user.email], (err, result) => {
            if (err) throw err;
            res.send({ msg: "Student enroll sucess" });
        })
    })
});



//Server Functions
//Login
/*
app.post("/auth", (req, res) => {
    email = req.body.email
    password = req.body.pass
    role = email.split("@")[1];

    switch (role) {
        case 'email.com':
            if (email && password) {
                res.redirect("/auth/google/admin")
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

        default:
            res.redirect("/?error=1")
            break;
    }
})
*/

//Server
app.listen(process.env.port || 8080);
console.log('Running at Port 8080');