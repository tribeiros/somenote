const mysql  = require('mysql');

function createDBConnection(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'usernameall',
            password: 'ThePassword',
            database: 'vault'
        });
}

module.exports = function() {
    return createDBConnection;
}


