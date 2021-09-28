import './App.css';
import React, { useEffect, useState} from "react";

function App() {

const [wallets, setWallets] = useState([]); 
const [expenses, setExpenses] = useState([]);


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


useEffect(() => {
    // console.log("goodbye")
    getWallets();
    getExpenses();
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
        <li id={i.id}> {i.category} £{i.amount}</li>)}
      </ul>

        <h2>Detailed Transaction</h2>

    </div>
  );
}

export default App;
