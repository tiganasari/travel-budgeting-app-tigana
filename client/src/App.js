import './App.css';
import React, { useEffect, useState} from "react";
import WalletDetail from "./components/WalletDetail";
import NewWallet from "./components/NewWallet";
import NewTransaction from "./components/NewTransaction";
import WalletList from "./components/WalletList";
import ExchangeRates from "./components/ExchangeRates";
import WalletModal from "./components/WalletModal";
import TransactionModal from "./components/TransactionModal";
import DeleteModal from "./components/DeleteModal";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

require('react-dom');
window.React2 = require('react');
// console.log(window.React1 === window.React2);


function App() {

const [wallets, setWallets] = useState([]); 
const [expenses, setExpenses] = useState([]);
const [currency, setCurrency] = useState(0);
const [error, setError] = useState("");
const [walletId, setWalletId] = useState(0);
const [cityName, setCityName] = useState(" ");
const [cityId, setCityId] = useState(0)
const [currencyName, setCurrencyName]= useState("");
const [nativeCurrencyName, setNativeCurrencyName] = useState("");
const [openWalletModal, setOpenWalletModal] = useState(false);
const [openTransModal, setOpenTransModal] = useState(false);
const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [sumTrans, setSumTrans] = useState(0);
 const [result, setResult] = useState([]);


const getWallets = () => {
  // console.log('hi')
    fetch("/wallets")
      .then((response) => response.json())
      .then(json => {
        // console.log(json);
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
        // console.log(json);
        setExpenses(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

     const getTransactions = (cityId) => {
      fetch(`/expenses/${cityId}`)
      .then((response) => response.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
        setResult(json);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  const addExpense = async (date, category, amount, amount_native_currency, notes, wallet_id) => {
    let expense = {date, category, amount, amount_native_currency, notes, wallet_id};
    let options = { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense)};

      try {
        await fetch ("/expenses", options);
        getExpenses();
         setOpenTransModal(true);
      } catch (err) {
        console.log("network error:" , err);
      }
  }
  let history = useHistory();

  const addWallet = async (city, currency, native_currency, sum, sum_native_currency, user_id) => {
    let wallet = { city, currency, native_currency, sum, sum_native_currency, user_id};
    let options = { method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wallet)};
     
      try {
        await fetch ("/wallets", options);
        console.log(wallets)
        getWallets();
        // alert("New wallet added!");
        setOpenWalletModal(true);

        // history.push("/");
        // history.go(0);
        
      } catch (err) {
        console.log("network error:" , err);
      }
     
  }

  const getCity = (name) => {
    setCityName(name)
    console.log(name);

  }

  const getCityId = (id) => {
    setCityId(id)
    console.log(cityId)
    console.log(id)
  }

    const getCurrencyName = (currency) => {
    setCurrencyName(currency);
    console.log(currency);

  }
    const getNativeCurrencyName = (native) => {
    setNativeCurrencyName(native);
    console.log(native);

  }

  function refreshPageWallet() {
    window.location.href= '/'
  }

    function refreshPage() {
    window.location.reload();
  }

  
  const deleteWallet = (id) => {
    console.log(id);
    fetch(`/wallets/${id}`, {
      method: "DELETE"
    })
    .then((response) => response.json())
      .then(json => {
        console.log(json);
        setOpenDeleteModal(true);
        setTimeout(() => {
        refreshPageWallet()
        }, 1000);
        
        // history.push("/");
        
      })
      .catch((error) => {
        console.log(error);
      });

  }

    const deleteTransaction = async (idTransaction) => {
    let options = { method: "DELETE"};
      try {
         await fetch (`/expenses/${idTransaction}`, options);
         console.log("string")
         getExpenses();
        //  alert("Expense removed!")
      } catch (err) {
        console.log("network error:" , err);
      }
  }
    //  const sumWallet = () => {
    //     let sum = 0;
    //     for (let i=0; i < expenses.length; i++) {
    //       if(expenses[i].wallet_id == cityId) {
    //       sum += Number(expenses[i].amount);
    //     }
    //       }
    //       setSumTrans(sum.toFixed(2));
    // }

    // const deleteTrans = (id) => {
    //   console.log(id)
    //   fetch(`/expenses/${id}`, {
    //   method: "DELETE"
    // })
  
    //   .then( () => {
    //   // refreshPage()
    //   console.log(walletId);
    //   getTransactions(walletId);
    //   getExpenses();
    //   sumWallet();
    //   console.log(sumTrans)
    
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }

useEffect(() => {
    getWallets();
    getExpenses();
    // getTransactions();

  }, []);


  return (
    <Router> 
      <div className="App">
      <div className="travellet"> 
      <div className="menu"> 

      </div>
      

      <Switch>
          <Route path ="/" exact> <WalletList wallets={wallets} getCityId= {(id) => getCityId (id) } getCity={(name) => getCity(name)} walletId={walletId} getCurrencyName={(currency) => getCurrencyName (currency)} getNativeCurrencyName={(native) => getNativeCurrencyName (native)} /> </Route> 
  
          <Route path ="/walletdetail/:id"> <WalletDetail nativeCurrencyName ={nativeCurrencyName} currencyName ={currencyName} expenses={expenses} cityId={cityId} cityName={cityName} error={error} currency={currency} deleteWallet={deleteWallet} getExpenses={(id) => getExpenses(id)} 
          deleteTransaction={(id) => deleteTransaction(id)}/> </Route> 
         
          <Route path ="/newwallet" > <NewWallet addWallet={(city, currency, native_currency, sum, sum_native_currency, user_id) => addWallet(city, currency, native_currency, sum, sum_native_currency, user_id)} /> </Route>
          
          <Route path ="/newtransaction"> <NewTransaction cityId={cityId} addExpense={(date, category, amount, mount_native_currency , notes, wallet_id) => addExpense(date, category, amount, mount_native_currency , notes, wallet_id)} /> </Route>
          
          <Route path ="/exchangerates"> <ExchangeRates currency={currency} /> </Route>
      </Switch>  

      { openWalletModal && <WalletModal closeModal={setOpenWalletModal}/> }
      { openTransModal && <TransactionModal closeTransModal={setOpenTransModal}/> }
      { openDeleteModal && <DeleteModal closeDeleteModal={setOpenDeleteModal}/> }
     
   
    </div>
    </div>
    </Router>

    
  );
}




export default App;
