import React, { useState } from 'react'

export const NewWallet = (props) => {

    const [walletData, setWalletData] = useState(walletInitialState);
    const walletInitialState = { city: "", currency: "", native_currency: "",sum :" ", sum_native_currency:" ", user_id:"" };

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

//   const addWallet = async (city, currency, native_currency, sum, sum_native_currency, user_id) => {
//     let wallet = { city, currency, native_currency, sum, sum_native_currency, user_id};
//     let options = { method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(wallet)};

//       try {
//         await fetch ("/wallets", options);
//         console.log(wallets)
//         getWallets();
//       } catch (err) {
//         console.log("network error:" , err);
//       }
      
//   }
//   const getWallets = () => {
//   // console.log('hi')
//     fetch("/wallets")
//       .then((response) => response.json())
//       .then(json => {
//         // upon success, update tasks
//         console.log(json);
//         setWallets(json);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };


    return (
        <div>
             <h2>
              Create a new wallet
            </h2>

            <h2>
              Create a new wallet
            </h2>
            <form>  
             <label>New Wallet</label>
            <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="city" value= {walletData.city} placeholder="city"/> 

            {/* <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="currency" value= {walletData.currency} placeholder="currency"/>  */}

             <select id="currency" name="currency" onChange={(e) => handleInputChangeWallet(e)}> 
            <option value={"GBP"}>Poundsterling</option>
            <option value={"EUR"}>Euros</option>
            <option value={"USD"}>Dollars</option>
            <option value={"IDR"}>Rupiah</option>
            </select>

              {/* <input type="text" onChange={(e) => handleInputChangeWallet(e)} name="native_currency" value= {walletData.native_currency} placeholder="native currency"/> 
               */}

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