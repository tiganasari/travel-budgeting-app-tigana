import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const WalletList = ({wallets}) => {
    const [walletId, setWalletId] = useState(0);

    const onSelectWallet = (id) => {
    setWalletId(id);
    console.log(walletId)
  }

    return (
        <div className="walletList">
        <h2>Available wallets</h2>
      <ul>
        {wallets.length > 0 && wallets.map((i) => 
        <li id={i.id}> {i.city} | {i.currency} to {i.native_currency} |  wallet sum {i.sum}
        <button key={i.id} onClick={() => onSelectWallet(i.id)}> view</button></li>)}
      </ul>
       <Link to="/newwallet"> 
        <button onClick= " ">Add a new Wallet</button>
        </Link>

        {/* move this button to WalletDetail component  */}
       <Link to="/newtransaction"> 
        <button onClick= " ">Add a new transaction</button>
        </Link> 


           
  </div>

  
    )
};

export default WalletList;
