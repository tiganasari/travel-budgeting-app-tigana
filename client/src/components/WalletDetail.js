import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// import NewTransaction from "./components/NewTransaction"; -> doesnt work, check path

const WalletDetail = ({expenses, cityId, cityName , currencyName, nativeCurrencyName, currency}) => {
    const { id } = useParams();
    const [result, setResult] = useState([]);
    const [sumTrans, setSumTrans] = useState(5);
  
    
    
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

    const onSelectItem = () => {

    }

  useEffect(() => {
    getTransactions(id);
    sumWallet();
  }, []);


    return (
        <div className="wallet-detail">  

        <div className="nav"> <p> <Link className="menu-nav" to={`/`} > &lt; wallets </Link>
        </p> 
        </div>

        <h2 className="cityName">{cityName}</h2>  

        <div className="wallet-overview">
          {/* Make dynamic SUM PLEASE */}
          <h2> Total spending </h2>
          <p>{currencyName} {sumTrans} </p>
          <p>{nativeCurrencyName} 880.09</p>
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
        <li className="transaction" key={i.id} onClick={() => onSelectItem(i.id)}> {i.date} {i.notes} <strong> {i.amount.toFixed(2)} </strong>| <strong>
         {((i.amount) * currency).toFixed(2)}  </strong>
         </li>)}
      </ul>
      </div>
       
      {/* add new transaction here, insert component NewTransaction */}


        </div>
    )
}

export default WalletDetail;
