import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import WalletDetail from  "./components/WalletDetail";

export const WalletList = ({wallets, handleId, walletId}) => {
  
    const onSelectWallet = (id) => {
    handleId(id);
  }

    return (
        <div className="walletList">
        <h2>Available wallets</h2>
      <ul>
        {wallets.length > 0 && wallets.map((i) => 
        <li className="button-list" id={i.id}> {i.city} | {i.currency} to {i.native_currency} 
        <button key={i.id} className="btn btn-light" onClick={() => onSelectWallet(i.id)}> view</button></li>)}
      </ul>

      <div className="wallet-buttons">

      
       <Link to="/newwallet"> 
        <button className="btn btn-light">Add a new Wallet</button>
        </Link>

        {/* move this button to WalletDetail component  */}
       <Link to="/newtransaction"> 
        <button type="button" className="btn btn-light">Add a new transaction</button>
        </Link> 

        <Link to="/exchangerates"> 
        <button className="btn btn-light">Live exchange rates</button>
        </Link> 
        
        {/* <Link to="/walletdetail"> 
        {/* <WalletDetail className="btn btn-light"/> */}
        {/* </Link>  */} 

      </div>    
           
  </div>

  
    )
};

export default WalletList;
