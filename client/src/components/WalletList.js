import React, { useState } from 'react'

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
  </div>
    )
};

export default WalletList;
