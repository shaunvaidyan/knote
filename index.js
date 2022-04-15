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

async function initMongo() {
    console.log('Initialising MongoDB...')
    let success = false
    while (!success) {
      try {
        client = await MongoClient.connect(mongoURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        success = true
      } catch {
        console.log('Error connecting to MongoDB, retrying in 1 second')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    console.log('MongoDB initialised')
    return client.db(client.s.options.dbName).collection('notes')
  }

async function start() {
    
    const db = await initMongo()

}