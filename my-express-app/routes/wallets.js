var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get("/", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM wallet ORDER BY id ASC")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/", (req, res) => {

  let {city, currency, sum, sum_native_currency, user_id} = req.body;
  db(
    `INSERT INTO wallet (city, currency, sum, sum_native_currency, user_id) VALUES ('${city}', '${currency}', ${sum}, ${sum_native_currency}, ${user_id} )`
  )
    .then(results => {
      res.send({ message: "done!" })
    })
    .catch(err => res.status(500).send(err));
});
module.exports = router;
