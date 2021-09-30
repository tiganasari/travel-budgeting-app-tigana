var express = require('express');
var router = express.Router();
const db = require("../model/helper");

function getAllWallets(req, res) {
  // Send back the full list of items
  db("SELECT * FROM wallet ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

//display all wallets
router.get("/", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM wallet ORDER BY id ASC")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//display wallet by ID 
router.get("/:wallet_id", (req, res) => {
  db(`SELECT * FROM wallet WHERE id=${req.params.wallet_id}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//create a new wallet
router.post("/", (req, res) => {
  let {city, currency, native_currency, sum, sum_native_currency, user_id} = req.body;
  db(
    `INSERT INTO wallet (city, currency, native_currency, sum, sum_native_currency, user_id) VALUES ('${city}', '${currency}', '${native_currency}', ${sum}, ${sum_native_currency}, ${user_id})`
  )
    .then(results => {
      // res.send({ message: "done!" });
      getAllWallets(req, res);
    })
    .catch(err => res.status(500).send(err));
});


//delete a wallet 
router.delete("/:wallet_id", (req, res) => {
  db(`DELETE FROM wallet WHERE id=${req.params.wallet_id}`)
    .then(results => {
      getAllWallets(req, res);
    })
    .catch(err => res.status(500).send({ err: "not found" }));
});

module.exports = router;
