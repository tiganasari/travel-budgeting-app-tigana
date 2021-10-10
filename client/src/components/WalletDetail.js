import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// import NewTransaction from "./components/NewTransaction"; -> doesnt work, check path

const WalletDetail = ({expenses, cityId, cityName , currencyName, nativeCurrencyName, currency, getCurrency}) => {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [sumTrans, setSumTrans] = useState(0);
    const [sumCurrency, setSumCurrency] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(0);
    
    //Make call backend for the specific wallet 
    //store currency and native in component
    //make api call with currency and native
    //setCurrency, etc
    //display

    async function getCurrency(currency) {
    let currency_url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyName}&to_currency=${nativeCurrencyName}&apikey=4E8ZBH6BEU83RWHA`;


    try {
    let response = await fetch(currency_url);
    if(response.ok) {
    let currencyResult = await response.json();
    let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    console.log(currency);
    setCurrencyRate(currency)
     } else {
    // setError ("server error")
  }
    } catch (err) {
    // setError("network error");
    }
    }
    
    
    const getTransactions = (walletId) => {
      fetch(`/expenses/${walletId}`)
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

    const sumWallet = () => {
        let sum = 0;
        for (let i=0; i < expenses.length; i++) {
          if(expenses[i].wallet_id == cityId) {
          sum += Number(expenses[i].amount);
        }
          }
          setSumTrans(sum.toFixed(2));
    }

    const sumWalletCurrency = () => {
        let sum= 0;
        sum = sumTrans * currency;
        setSumCurrency(sum);
        
    }
    const onSelectItem = () => {

    }

  useEffect(() => {
    getTransactions(id);
    sumWallet();
    sumWalletCurrency();
    console.log(currency)
    getCurrency();
  }, []);


    return (
        <div className="wallet-detail">  


        <div className="nav"  > <p> <Link className="menu-nav" to={`/`} > &lt; wallets </Link>
        </p> 
        </div>

        <h2 className="cityName">{cityName}</h2>  

        <div className="wallet-overview">
          {/* Make dynamic SUM PLEASE */}
          <h2> Total spending </h2>
          <p>{currencyName} {sumTrans} </p>
          <p>{nativeCurrencyName} {(sumTrans * currencyRate).toFixed(2)}</p>
        </div>
        <div className="new-transaction">
          <p>New expense</p>
           <Link to={`/newtransaction`} >
          <button className="btn btn-light">+</button>
          </Link>
        </div>
        <div className="transaction-list"> 
         <ul>
        {result.map((i) => 
        <li className="transaction" key={i.id} onClick={() => onSelectItem(i.id)}> {i.date} {i.notes} <strong> {i.amount.toFixed(2)} </strong>| 
        <strong> {((i.amount) *  currencyRate).toFixed(2)} </strong>
         </li>)}
      </ul>
      </div>
       
      {/* add new transaction here, insert component NewTransaction */}


        </div>
    )
}

export default WalletDetail;
