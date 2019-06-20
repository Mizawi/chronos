passport = require('passport'),
    //LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth20')
con = require('./database')

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser((email, done) => {
    role = email.split("@")[1];
    switch (role) {
        case 'email.com':
            con.query('select * from admin where email=?', [email], (err, result) => {
                if (err) throw err;
                done(null, result)
            })
        case 'alunos.fc.ul.pt':
            con.query('select * from aluno where email=?', [email], (err, result) => {
                if (err) throw err;
                done(null, result)
            })
        case 'fc.ul.pt':
            con.query('select * from professor where email=?', [email], (err, result) => {
                if (err) throw err;
                done(null, result)
            })
    }
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: '405516367875-dkk9cjbj8vr6viu681lmqhufputcm6vo.apps.googleusercontent.com',
        clientSecret: 'tWGFNFlWbkathxy_3yLVEGwA'
    }, (accessToken, refreshToken, profile, done) => {
        sql = 'select * from users where googleid=?'
        con.query(sql, [profile.id], (err, result) => {
            if (err) throw err;
            if (result[0].email_admin != undefined) {
                user = ({
                    email: result[0].email_admin
                })
                done(null, user)
            } else if (result[0].email_student != undefined) {
                user = ({
                    email: result[0].email_student
                })
                done(null, user)
            } else {
                user = ({
                    email: result[0].email_prof
                })
                done(null, user)
            }

        })
    })
)

module.exports = passport;