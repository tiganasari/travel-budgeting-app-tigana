import './App.css';
import React, { useEffect, useState} from "react";

function App() {

const [wallets, setWallets] = useState([]); 
const [expenses, setExpenses] = useState([]);
const [currency, setCurrency] = useState(0);
const [error, setError] = useState("");

const getWallets = () => {
  // console.log('hi')
    fetch("/wallets")
      .then((response) => response.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
        setWallets(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getExpenses = () => {
  // console.log('hi')
    fetch("/expenses")
      .then((response) => response.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
        setExpenses(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSelectItem = (id) => {
    let result = expenses.filter(expense => expense.id = id)
    console.log(result)
  }
  //try out static external API call - USD to GBP
async function getCurrency(currency) {
  let currency_url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=GBP&apikey=4E8ZBH6BEU83RWHA";


try {
  let response = await fetch(currency_url);
  if(response.ok) {
    let currencyResult = await response.json();
    let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    setCurrency(currency)
    // console.log(currency["Realtime Currency Exchange Rate"][ "1. From_Currency Code"])
  } else {
    setError ("server error")
  }
} catch (err) {
  setError("network error");
}
}

useEffect(() => {
    // console.log("goodbye")
    getWallets();
    getExpenses();
    // getCurrency();
  }, []);
 

  return (
    <div className="App">
      <h1> TRAVEL EXPENSE TRACKER APP</h1>
      <h2>Available wallets</h2>
      <ul>
        {wallets.map((i) => 
        <li id={i.id}> {i.city} </li>)}
      </ul>
      <h2>Transactions</h2>
      <ul>
        {expenses.map((i) => 
        <li id={i.id} onClick={(e) => onSelectItem(i.id)}> {i.category} £{i.amount}</li>)}
      </ul>

        <h2>Live exchange rates</h2>
        {/* 1 USD = {currency} GBP */}

        <h2>Transaction Details</h2>
       <p> {onSelectItem}</p>

    </div>
  );
}

export default App;
