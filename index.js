let express = require('express');

const maria = require('./database/connect/maria');
const app = express();
const port = process.env.PORT || 3000;

app.get('/select', function (req, res) {
    maria.query('SELECT * FROM admin',
        function (err, rows, fields) {
        console.log(rows[0].id);
        if (!err) {
            res.send(rows);
        } else {
            console.log('err : ' + err);
            res.send(err);
        }
        })
});

app.post('/insert', function (req, res) {
    let stats = randomStats(4);
    stats.sort(() => Math.random() - 0.5);
    console.log(req);

    let values = {
        'str' : stats[0],
        'dex' : stats[1],
        'int' : stats[2],
        'spr' : stats[3]
    }
    maria.query('INSERT INTO stats set ?', values, function (err, rows) {
        if (!err) {
            res.send(rows);
        } else {
            console.log('err : ' + err);
            res.send(err);
        }
    })
})

function randomStats(e) {
    let list = new Array();
    let min = 0;
    let max = 30;
    let number = 0;

    // for (let i = 1; i < e; i++) {
    //     number = parseInt(Math.random() * (max - min) + min);
    //     max = max - number;
    //     list.push(number);
    // }
    // list.push(max)
    // return list;

    while(e - 1 > list.length) {
        let random = parseInt(Math.random() * (max - min) + min);
        max -= random;
        list.push(random);
    }
    list.push(max);
    return list;
}

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});