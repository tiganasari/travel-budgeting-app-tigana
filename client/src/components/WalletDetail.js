import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import NewTransaction from "./components/NewTransaction"; -> doesnt work, check path

const WalletDetail = ({expenses, walletId, city}) => {
    const { id } = useParams();
    const [result, setResult] = useState([]);
  
    
    useEffect(() => {
    console.log(id)
    getTransactions(id);
  }, []);

    const onSelectItem = (id) => {
    // console.log(id);
    let result = expenses.filter(expense => expense.id === id)
    setResult(result);
    console.log(result[0].category);
    
    
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

    

    return (
        <div className="wallet-detail">  
        <h2>{city} London</h2>  

        <div className="wallet-overview">
          {/* Make dynamic SUM PLEASE */}
          <h2> Total spending </h2>
          <p>£709.80 | $1180.09</p>
        </div>
        <div className="new-transaction">
          <p>New expense</p>
          <button className="btn btn-light">+</button>
          
        </div>
        <div className="transaction-list"> 
         <ul>
        {result.map((i) => 
        <li className="transaction" key={i.id} onClick={() => onSelectItem(i.id)}> {i.date} | {i.notes} £{i.amount.toFixed(2)} | 
         {/* {(i.amount) / currency}   */}
         </li>)}
      </ul>
      </div>
       
      {/* add new transaction here, insert component NewTransaction */}


        </div>
    )
}

export default WalletDetail;
