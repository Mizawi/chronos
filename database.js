const mysql = require('mysql');
const fs = require('fs');

// Database Connection for Production


//II==========================================================================II//
//II        UNCOMMENT TO DEPLOY TO GCLOUD/COMMENT FOR LOCAL DEVELOPMENT       II//
//II==========================================================================II//

/*
let config = {

    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    multipleStatements: true,
}

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

let connection = mysql.createConnection(config);
*/
//************************************************************************************//
//************************************************************************************//

//II==========================================================================II//
//II        UNCOMMENT FOR LOCAL DEVELOPMENT/COMMENT TO DEPLOY TO GCLOUD       II//
//II==========================================================================II//


// Database Connection for Development

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    multipleStatements: true,
    ssl: {
        ca: fs.readFileSync(__dirname + '/certs/server-ca.pem'),
        key: fs.readFileSync(__dirname + '/certs/client-key.pem'),
        cert: fs.readFileSync(__dirname + '/certs/client-cert.pem')
    }
});

con = connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;
