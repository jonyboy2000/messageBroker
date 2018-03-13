const express = require('express');
const app = express();
const db = require('./dbIntegration');
const port = 3000;

app.get('/', (req, res) => res.send('app is working'));

app.get('/logs', (req, res) => {
    console.log(db.getAllLogs());
    res.send(db.getAllLogs())
});

app.listen(port, () => console.log(`server living on ${port} port`));