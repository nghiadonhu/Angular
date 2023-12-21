const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'doan5',
  });
  module.exports = connection;