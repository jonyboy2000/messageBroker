const express = require('express');
const app = express();
const db = require('./dbIntegration');
const log = require('debug-logger')('myapp');
const port = 3000;

app.get('/', (req, res) => res.send('app is working'));

app.get('/logs', (req, res) => {
    db.getAllLogs()
        .then(result => {
            res.send(result)
        })
});

app.get('/logs/errors/', (req, res) => {
    db.getErrors()
        .then(result => {
            res.send(result);
        })
});

app.get('/query', (req, res) => {

});


app.listen(port, () => console.log(`server living on ${port} port`));