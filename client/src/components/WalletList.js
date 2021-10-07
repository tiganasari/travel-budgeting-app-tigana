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
    // getCurrency(props.currency, props.native);
    // console.log(props.currency);
    // console.log(props.native);
    
  }, []);

//   async function getCurrency(currency, native) {

//   let currency_url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currency}&to_currency=${native}}&apikey=4E8ZBH6BEU83RWHA`;


// try {
//   let response = await fetch(currency_url);
//   if(response.ok) {
//     let currencyResult = await response.json();
//     let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
//     setCurrency(currency)
//     console.log(currency)
//   } else {
//     // setError ("server error")
//   }
// } catch (err) {
//   // setError("network error");
// }
// }

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
