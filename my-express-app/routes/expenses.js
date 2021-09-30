var express = require('express');
var router = express.Router();
const db = require("../model/helper");

function getAllExpenses(req, res) {
  // Send back the full list of items
  db("SELECT * FROM expenses ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}

//display all expenses
router.get("/", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM expenses ORDER BY id ASC")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//display expense by ID 
router.get("/:wallet_id", (req, res) => {
  db(`SELECT * FROM expenses WHERE wallet_id=${req.params.wallet_id}`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

//create a new expenses
router.post("/", (req, res) => {
  let {category, amount, amount_native_currency, date, notes, wallet_id} = req.body;
  db(
    `INSERT INTO expenses (category, amount, amount_native_currency, date, notes, wallet_id) VALUES ('${category}', ${amount}, ${amount_native_currency},'${date}', '${notes}', ${wallet_id})`
  )
    .then(results => {
      // res.send({ message: "done!" });
      getAllExpenses(req, res);
    })
    .catch(err => res.status(500).send(err));
});


//delete an expense
router.delete("/:expense_id", (req, res) => {
  db(`DELETE FROM expenses WHERE id=${req.params.expense_id}`)
    .then(results => {
      getAllExpenses(req, res);
    })
    .catch(err => res.status(500).send({ err: "not found" }));
});

module.exports = router;
