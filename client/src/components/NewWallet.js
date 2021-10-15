import React, { useState } from 'react';
import {  Link } from 'react-router-dom';

export const NewWallet = (props) => {
    const walletInitialState = { city: "", currency: "GBP", native_currency: "GBP",sum :" ", sum_native_currency:" ", user_id:"" };

    const [walletData, setWalletData] = useState(walletInitialState);
    
    const handleInputChangeWallet = (event) => {
    let { name, value } = event.target;
    // console.log( value);
    setWalletData({ ... walletData,  [name]: value});
    };
    
    const handleSubmitWallet = (event) => {
    event.preventDefault();
    props.addWallet(walletData.city, walletData.currency, walletData.native_currency, 0, 0, 1);
    setWalletData(walletInitialState);
  };


    return (
        <div className="new-wallet">
          <div className="nav"> <p> <Link className="menu-nav" to={`/`} > &lt; wallets </Link>
        </p> 
        </div>
            <h2>
              New wallet
            </h2>
            <form className="form">  
            <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="city" value= {walletData.city} placeholder="Enter a city"/> 
            <div className="currency-label">  
            <label>Currency </label>
            <select className="currency" id="currency" name="currency" onChange={(e) => handleInputChangeWallet(e)}> 
            <option value={"GBP"}>Poundsterling</option>
            <option value={"EUR"}>Euros</option>
            <option value={"USD"}>Dollars</option>
            <option value={"IDR"}>Rupiah</option>
            </select>
            </div>

            <div className="currency-label">
            <label>Native currency </label>
            <select className="native-currency" id="native_currency" name="native_currency" onChange={(e) => handleInputChangeWallet(e)}> 
            <option value={"GBP"}>Poundsterling</option>
            <option value={"EUR"}>Euros</option>
            <option value={"USD"}>Dollars</option>
            <option value={"IDR"}>Rupiah</option>
            </select>
            </div>
            <div class="col text-center">
            <button className=" btn btn-light new-button" onClick={handleSubmitWallet} type ="submit">
            submit
            </button>
            </div>
            </form>
            
           
        </div>
    )
}

export default NewWallet;