passport = require('passport'),
//LocalStrategy = require('passport-local').Strategy,
GoogleStrategy = require('passport-google-oauth20')
con = require('./database')

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser((email, done) => {
    con.query('select * from admin where email=?', [email], (err, result) => {
        if (err) throw err;
        done(null, result)
    })
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/admin',
        clientID: '405516367875-dkk9cjbj8vr6viu681lmqhufputcm6vo.apps.googleusercontent.com',
        clientSecret: 'tWGFNFlWbkathxy_3yLVEGwA'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('aqui')
        con.query('select * from admin where googleid=?', [profile.id], (err, result) => {
            if (err) throw err;
            user = ({
                name: JSON.parse(result[0].information).nome,
                email: result[0].email
            })
            done(null, user)
        })
    })
)

module.exports = passport;