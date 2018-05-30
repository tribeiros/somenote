const mysql  = require('mysql');

function createDBConnection(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'usernameall',
            password: 'ThePassword',
            database: 'notes'
        });
}

module.exports = function() {
    return createDBConnection;
}


