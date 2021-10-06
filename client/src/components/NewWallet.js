import React, { useState } from 'react';


export const NewWallet = (props) => {
    const walletInitialState = { city: "", currency: "", native_currency: "",sum :" ", sum_native_currency:" ", user_id:"" };

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
        <div>
    

            <h2>
              Create a new wallet
            </h2>
            <form>  
             <label>New Wallet</label>
            <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="city" value= {walletData.city} placeholder="city"/> 

          
             <select id="currency" name="currency" onChange={(e) => handleInputChangeWallet(e)}> 
            <option value={"GBP"}>Poundsterling</option>
            <option value={"EUR"}>Euros</option>
            <option value={"USD"}>Dollars</option>
            <option value={"IDR"}>Rupiah</option>
            </select>
  
                <select id="native_currency" name="native_currency" onChange={(e) => handleInputChangeWallet(e)}> 
            <option value={"GBP"}>Poundsterling</option>
            <option value={"EUR"}>Euros</option>
            <option value={"USD"}>Dollars</option>
            <option value={"IDR"}>Rupiah</option>
            </select>
              <button onClick={handleSubmitWallet} type ="submit">
            submit
            </button>
            </form>
            
           
        </div>
    )
}

export default NewWallet;