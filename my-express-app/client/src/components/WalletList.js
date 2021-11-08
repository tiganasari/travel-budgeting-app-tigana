import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import WalletDetail from  "./components/WalletDetail";

export const WalletList = (props) => {
  
  const [currency, setCurrency] = useState(0);

    const onSelectWallet = (city, id, currency, native) => {
    props.getCity(city);
    props.getCityId(id);
    props.getCurrencyName(currency);
    props.getNativeCurrencyName(native)
  
  }


  
  useEffect(() => {
    
  }, []);


    return (
      <div>
         <h1 className="title"> Hello, Tigana! </h1>
        <div className="wallet-list">
          <h2>Available wallets</h2>
          <ul>
            {props.wallets.length > 0 && props.wallets.map((i) => 
            <li className="button-list" key={i.id} onClick={() => onSelectWallet(i.city, i.id, i.currency, i.native_currency)}>
              <Link className="link" to={`walletdetail/${i.id}`}>
            {i.city} | {i.currency} to {i.native_currency} 
              </Link>
               
              
            </li>)}
          </ul>
        </div>

      <div className="wallet-buttons">
        <Link to="/newwallet"> 
        <button className="btn btn-success">Add a new wallet</button>
        </Link>

        <Link to="/exchangerates"> 
        <button className="btn btn-warning">Live exchange rates</button>
        </Link> 

        


 
      </div>    
           
  </div>

    )
};

export default WalletList;
