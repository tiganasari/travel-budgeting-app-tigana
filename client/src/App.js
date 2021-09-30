import './App.css';
import React, { useEffect, useState} from "react";

function App() {

const [wallets, setWallets] = useState([]); 
const [expenses, setExpenses] = useState([]);
const [currency, setCurrency] = useState(0);
const [error, setError] = useState("");
const [result, setResult] = useState([]);
const formInitialState = { date: "", category: " ", amount: "", amount_native_currency: "", notes: "", wallet_id: "",};
const walletInitialState = { city: "", currency: "",sum :" ", sum_native_currency:" ", user_id:"" };
const [formData, setFormData] = useState(formInitialState);
const [walletData, setWalletData] = useState([walletInitialState]);


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
    // console.log(id);
    let result = expenses.filter(expense => expense.id === id)
    setResult(result);
    console.log(result[0].category);
  }

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ... formData,  [name]: value});
  }
  const handleInputChangeWallet = (event) => {
    let { name, value } = event.target;
    setWalletData({ ... walletData,  [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addExpense(formData.date, formData.category,formData.amount, 0, formData.notes, 1 );
    setFormData(formInitialState);
  };
  const handleSubmitWallet = (event) => {
    event.preventDefault();
    addWallet(walletData.city, walletData.currency, 0, 0, 1);
    setWalletData(walletInitialState);
  };

 

  const addExpense = async (date, category, amount, amount_native_currency, notes, wallet_id) => {
    let expense = { date, category, amount, amount_native_currency, notes, wallet_id};
    let options = { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)};

      try {
        await fetch ("/expenses", options);
        getExpenses();
      } catch (err) {
        console.log("network error:" , err);
      }
  }
  const addWallet = async (city, currency, sum, sum_native_currency, user_id) => {
    let wallet = { city, currency, sum, sum_native_currency, user_id};
    let options = { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wallet)};

      try {
        await fetch ("/wallets", options);
        console.log(wallets)
        getWallets();
      } catch (err) {
        console.log("network error:" , err);
      }
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
    console.log(currency)
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
        <li key={i.id} onClick={() => onSelectItem(i.id)}> {i.category} £{i.amount}</li>)}
      </ul>

        <h2>Live exchange rates</h2>
        1 USD = {currency} GBP

        <h2>Transaction Details</h2>
        {/* very buggy, look into this */}
     {/* {result[0].date} {result[0].category} GBP{(result[0].amount).toFixed(2)} | USD{(result[0].amount* currency).toFixed(2)} */}



          <h2>Create a new transaction</h2>
          <form>
            <label>New Transaction</label>
            <input type="date"
            onChange={(e) => handleInputChange(e)} name="date"  placeholder="date">
            </input>
            
            <input type="text"
            onChange={(e) => handleInputChange(e)} name="category" value= {formData.category} placeholder="category">
            </input>

            {/* <select id="categories" name="category" onSelect={(e) => handleInputChange(e)}> 
            <option value={formData.category}>Food</option>
            <option value={formData.category}>Travel</option>
            <option value={formData.category}>Shopping</option>
            <option value={formData.category}>Others</option>


            </select> */}

            <input type="number"
            onChange={(e) => handleInputChange(e)} name="amount" value= {formData.amount} placeholder="amount">
            </input>
             {/* <input type="number"
            onChange={(e) => handleInputChange(e)} name="amount_native_currency" value= {formData.amount_native_currency} placeholder="amount native currency">
            </input> */}


           <input type="notes"
            onChange={(e) => handleInputChange(e)} name="notes" value= {formData.notes} placeholder="notes">
            </input>
            {/* <input type="number"
            onChange={(e) => handleInputChange(e)} name="wallet_id" value= {formData.wallet_id} placeholder="wallet">
            </input> */}

            <button onClick={handleSubmit} type ="submit">
            submit
            </button>
          </form>


            <h2>
              Create a new wallet
            </h2>
            <form>  
             <label>New Wallet</label>
            <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="city" value= {walletData.city} placeholder="city"/> 

            <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="currency" value= {walletData.currency} placeholder="currency"/> 

              {/* <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="native_currency" value= {walletData.native_currency} placeholder="native currency"/>  */}
              
              <button onClick={handleSubmitWallet} type ="submit">
            submit
            </button>
            </form>
            
    </div>
  );
}

export default App;
