let express = require('express');

const maria = require('./database/connect/maria');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', function (req, res) {
   res.status(200).json({
       'message' : "성공"
   })
});

app.get('/select', function (req, res) {
    maria.query('SELECT * FROM admin',
        function (err, rows, fields) {
        console.log(rows[0]);
        if (!err) {
            res.send(rows);
        } else {
            console.log('err : ' + err);
            res.send(err);
        }
        })
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});