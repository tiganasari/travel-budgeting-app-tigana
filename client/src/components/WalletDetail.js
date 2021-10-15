import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const WalletDetail = ({expenses, cityId, cityName , currencyName, nativeCurrencyName, currency, getCurrency}) => {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [sumTrans, setSumTrans] = useState(0);
    const [sumCurrency, setSumCurrency] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(0);
    
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

    const onSelectDelete = (id) => {
      console.log(id);
      fetch(`/wallets/${id}`, {
      method: "DELETE"
    })
    .then((response) => response.json())
      .then(json => {
        console.log(json);
        alert("Wallet deleted!");

        
      })
      .catch((error) => {
        console.log(error);
      });
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
       <div className="button-delete">
        <button className="button-list" key={id} onClick={() => onSelectDelete(id)}> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash delete-icon" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
         </svg></button> 
         <span className="tooltiptext">Delete this wallet</span>
        </div>
      </div>
    )
}

export default WalletDetail;
