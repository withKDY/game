const maria = require('mysql');

const conn = maria.createConnection({
    host :  'dyeyoung.c1uz9bbl7ks4.ap-northeast-2.rds.amazonaws.com',
    port : 3306,
    user : 'eodyd',
    password : 'rlaeodyd',
    database : 'toy'
});

module.exports = conn;