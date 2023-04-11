let express = require('express');

const maria = require('./database/connect/maria');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    let data = req.body;
    let max = Math.max.apply(Math, stats);
    let character = new Array();
    let userId;
    let values = {
        'name': data.name,
    }
    maria.query('INSERT INTO user set ?', values, function (err, rows) {
        userId = rows.insertId;
        values = {
            'userId' : userId
        }
        if (!err) {
            character.push(rows);
            maria.query('INSERT INTO inventory set ?', values, function (err, rows) {
                if (!err) {
                    character.push(rows);
                    stats.sort(() => Math.random() - 0.5);
                    let job = getKeyByValue(stats, max);

                    values = {
                        'userId' : userId,
                        "job" : job,
                        'str' : stats[0],
                        'dex' : stats[1],
                        'int' : stats[2],
                        'spr' : stats[3]
                    }
                    maria.query('INSERT INTO stats set ?', values, function (err, rows) {
                        if (!err) {
                            character.push(rows);
                            res.send(character);
                        } else {
                            console.log('err : ' + err);
                            res.send(err);
                        }
                    });
                } else {
                    console.log('err : ' + err);
                    res.send(err);
                }
            })
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

    while(e - 1 > list.length) {
        let random = parseInt(Math.random() * (max - min) + min);
        max -= random;
        list.push(random);
    }
    list.push(max);
    return list;
}

function getKeyByValue(obj, value) {
    let key = parseInt(Object.keys(obj).find(key => obj[key] === value));
    let job;
    switch (key) {
        case 0:
            job = "전사";
            break;
        case 1:
            job = "도적";
            break;
        case 2:
            job = "마법사";
            break;
        case 3:
            job = "힐러";
            break;
    }
    return job;
}

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});