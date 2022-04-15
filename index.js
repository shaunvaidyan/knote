const path = require('path');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/dev'

const app = express();
const port = process.env.PORT || 3000;

async function start() {
    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, 'public')))

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })

    app.get('/', (req, res) => res.render('index'))
}

start()