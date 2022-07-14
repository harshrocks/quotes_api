const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const BookRoute = require('./quotes_routes');

require("dotenv").config();
app.use('/quotes/api/', BookRoute);

url = "mongodb://localhost:27017";
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => {
    console.log('Connected to MongoDB');
  }
).catch(
  (err) => {
    console.log('Error connecting to MongoDB: ', err.message);
  }
);

const db_collection = mongoose.connection.useDb('hello').collection('Quotes');

var genreList = db_collection.distinct("genre").then(
  (docs) => {
   global.genres = docs;
    // console.log(genres);
   return docs;
  }
);
console.log(global.genres);
console.log(genreList.then(
  (docs) => {
    console.log(docs);
  }
));
app.get('/quotes/genre/:genre', (req, res) => {

  const genre = req.params.genre;
  console.log(genre);
  db_collection.find({ 'genre': `${genre}` }).toArray(
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(result);
    }
  )
});

app.get('/tshirt/hello', (req, res) => {
  res.status(200).send(
    {
      "name": "😂😁😀😀",
      "favorite_food": "🍞🧈🧈🧈🍟🍟🍔🍕🍕🍕",
      "favorite_heroine": "Katrina Kaif",
      "favourite_companny": "ISRO🚀🚀"
    }
  );
});

app.get('/quotes', (req, res) => {
  db_collection.find({ 'genre': 'hope' }).toArray(

    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(result);
    }
  )
});

app.get('/', (req, res) => {
  res.status(200).send('Hello I am the homepage of this server!');

});



app.listen(
  PORT,
  () => { console.log(`Server is live at ${PORT}`); }
);

module.exports = db_collection;