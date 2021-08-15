const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x2r2l.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const toDoCollection = client.db("Youth-India-Foundation-E-School").collection("orders");

  app.post('/addOrder', (req, res) => {
    const toDo = req.body;
    console.log(toDo)
    toDoCollection.insertOne(toDo)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/orders', (req, res) => {
    toDoCollection.find({})
      .toArray((err, result) => {
        res.send(result);
      })
  })
});

app.listen(process.env.PORT || port);