import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import WalletDetail from  "./components/WalletDetail";

export const WalletList = ({wallets, getCity}) => {
  
    const onSelectWallet = (city) => {
    getCity(city);
  }

    return (
      <div>
         <h1 className="title"> Hello, Tigana! </h1>
        <div className="wallet-list">
        <h2>Available wallets</h2>
        <ul>
          {wallets.length > 0 && wallets.map((i) => 
          <li className="button-list" key={i.id} onClick={() => onSelectWallet(i.city)}>
            <Link className="link" to={`walletdetail/${i.id}`}>
           {i.city} | {i.currency} to {i.native_currency} 
            </Link>
           
            {/* <link to={`wallet/${walletId}`}> {i.city} | {i.currency} to {i.native_currency} </link> */}
          {/* <button key={i.id} className="btn btn-light" onClick={() => onSelectWallet(i.id)}> view</button> */}
          </li>)}
        </ul>
        </div>
      <div className="wallet-buttons">
       <Link to="/newwallet"> 
        <button className="btn btn-success">Add a new Wallet</button>
        </Link>

        {/* move this button to WalletDetail component  */}
       {/* <Link to="/newtransaction"> 
        <button type="button" className="btn btn-light">Add a new transaction</button>
        </Link>  */}

        <Link to="/exchangerates"> 
        <button className="btn btn-warning">Live exchange rates</button>
        </Link> 
        
        {/* <Link to="/walletdetail"> 
        {/* <WalletDetail className="btn btn-light"/> */}
        {/* </Link>  */} 

      </div>    
           
  </div>

  
    )
};

export default WalletList;
