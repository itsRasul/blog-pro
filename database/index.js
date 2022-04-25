const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

// below code causes to connect to database and return a obj that we can query on database which supports promises
module.exports = connection.promise();
