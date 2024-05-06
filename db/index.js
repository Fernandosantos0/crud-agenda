const mysql = require("mysql2");

const conn = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'americalatina',
    database: 'agenda',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

module.exports = conn;
