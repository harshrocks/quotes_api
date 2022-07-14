const express = require("express");
const router = express.Router();
const Quote = require("./quotes_model");

// get all quotes
router.get("/all", async (req, res) => {
 
    const quotes = await Quote.find().then(
      (docs) => {
        res.send(docs);
      }
    ).catch((err) => {
    res.status(404).json({ message: err });
  })
});

// get random quote
router.get("/random", async (req, res) => {
  try {
    const quotes = await Quote.find();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).json(randomQuote);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

// get specific quote
router.get("/:quoteId", async (req, res) => {
  try {
    const quote = await Quote.find({ quoteId: req.params.quoteId });
    res.status(200).json(quote);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;