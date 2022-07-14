const mongoose = require("mongoose");

const Quote = new mongoose.Schema({
  quote: {
    type:String,
  },
  author: {
    type: String,
  },
  genre : {
    type: String,
  }
  
});

module.exports = mongoose.model("Quotes", Quote);  