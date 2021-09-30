import './App.css';
import React, { useEffect, useState} from "react";
import WalletDetail from "./components/WalletDetail";

function App() {

const [wallets, setWallets] = useState([]); 
const [expenses, setExpenses] = useState([]);
const [currency, setCurrency] = useState(0);
const [error, setError] = useState("");

const formInitialState = { date: "", category: " ", amount: "", amount_native_currency: "", notes: "", wallet_id: "",};
const walletInitialState = { city: "", currency: "", native_currency: "",sum :" ", sum_native_currency:" ", user_id:"" };
const [formData, setFormData] = useState(formInitialState);
const [walletData, setWalletData] = useState(walletInitialState)
const [walletId, setWalletId] = useState(0);
//add onlick wallet map or add a button
// key needs to be added {item.id}
// after onclick, create function getWalletId
//update setWalletId hook
//replace 34 by hookId 
//add condition inside addExpense function to avoid new transaction without walletId



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

  // const onSelectItem = (id) => {
  //   // console.log(id);
  //   let result = expenses.filter(expense => expense.id === id)
  //   setResult(result);
  //   console.log(result[0].category);
  // }

  const onSelectWallet = (id) => {
    console.log(id);
  }

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    console.log(name + " " + value);
    
    setFormData({ ... formData,  [name]: value});
  }
  const handleInputChangeWallet = (event) => {
    let { name, value } = event.target;
    console.log( value);
    setWalletData({ ... walletData,  [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addExpense(formData.date, formData.category,formData.amount, 0, formData.notes, 34 );
    setFormData(formInitialState);
  };
  const handleSubmitWallet = (event) => {
    event.preventDefault();
    addWallet(walletData.city, walletData.currency, walletData.native_currency, 0, 0, 1);
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
  const addWallet = async (city, currency, native_currency, sum, sum_native_currency, user_id) => {
    let wallet = { city, currency, native_currency, sum, sum_native_currency, user_id};
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
    getCurrency();
  }, []);


  //First version
//  wallets.map( wallet = () => {
//   expenses.map( expense = () =>{
//       //if wallet id  === expense wallet id
//           //then wallet sum += expense sum
         
//   })
//  }
//   //display sum in a html tag
//  )

  return (
    <div className="App">
      <h1> TRAVEL EXPENSE TRACKER APP</h1>
      <div className="walletList">
          

         <h2>Available wallets</h2>
      <ul>
        {wallets.length > 0 && wallets.map((i) => 
        <li id={i.id}> {i.city} | {i.currency} to {i.native_currency} |  wallet sum {i.sum}
        <button key={i.id} onClick={() => onSelectWallet(i.id)}> view</button></li>)}
      </ul>
      </div>
      
     
      <h2>Transactions</h2>
       <WalletDetail
         expenses={expenses} />
      {/* <ul>
        {expenses.map((i) => 
        <li key={i.id} onClick={() => onSelectItem(i.id)}> {i.date} {i.category} | {i.notes} £{i.amount.toFixed(2)} | $ {(i.amount / currency).toFixed(2)} 
         {(i.amount) / currency}  
         </li>)}
      </ul> */}

        <h2>Live exchange rates</h2>
        1 USD = {currency} GBP

        <h2>Transaction Details</h2>  
       
{/* 
        {result.length > 0 &&  <p> {result[0].date} {result[0].category} GBP{(result[0].amount).toFixed(2)} | USD{(result[0].amount/ currency).toFixed(2)}  </p> } */}
      
          <h2>Create a new transaction</h2>
          <form>
            <label>New Transaction</label>
            <input type="date"
            onChange={(e) => handleInputChange(e)} name="date"  placeholder="date">
            </input>
            
            {/* <input type="text"
            onChange={(e) => handleInputChange(e)} name="category" value= {formData.category} placeholder="category">
            </input> */}

            <select id="categories" name="category" onChange={(e) => handleInputChange(e)}> 
            <option value={"Food"}>Food</option>
            <option value={"Travel"}>Travel</option>
            <option value={"Shopping"}>Shopping</option>
            <option value={"Others"}>Others</option>
            <option value={"Accommodation"}>Accommodation</option>
            </select>

            <input type="text"
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

            {/* <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="currency" value= {walletData.currency} placeholder="currency"/>  */}

             <select id="currency" name="currency" onChange={(e) => handleInputChangeWallet(e)}> 
            <option value={"GBP"}>Poundsterling</option>
            <option value={"EUR"}>Euros</option>
            <option value={"USD"}>Dollars</option>
            <option value={"IDR"}>Rupiah</option>
            </select>

              {/* <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="native_currency" value= {walletData.native_currency} placeholder="native currency"/> 
               */}

                <select id="native_currency" name="native_currency" onChange={(e) => handleInputChangeWallet(e)}> 
            <option value={"GBP"}>Poundsterling</option>
            <option value={"EUR"}>Euros</option>
            <option value={"USD"}>Dollars</option>
            <option value={"IDR"}>Rupiah</option>
            </select>
              <button onClick={handleSubmitWallet} type ="submit">
            submit
            </button>
            </form>
            
    </div>
  );
}

export default App;
