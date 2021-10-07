import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NewTransaction = (props) => {

    const formInitialState = { date: "", category: " ", amount: "", amount_native_currency: "", notes: "", wallet_id: "",};
    const [formData, setFormData] = useState(formInitialState);
    
    
    const handleInputChange = (event) => {
    let { name, value } = event.target;
    
    setFormData({ ... formData,  [name]: value});
  }

    const handleSubmit = (event) => {
    event.preventDefault();
    props.addExpense(formData.date, formData.category,formData.amount, 0, formData.notes, props.setCityId);
    setFormData(formInitialState);
  };
    

    return (
        <div className="add-transaction">
          {/* Fix link to go to that specific wallet Id */}
        <div className="nav"> <p> <Link className="menu-nav" to={`/walletdetail/34`} > &lt; expenses </Link>
        </p> 
        </div>
        <h2>New expense</h2>
          <form className="form">
            <label></label>
            <input  type="date"
            onChange={(e) => handleInputChange(e)} name="date"  placeholder="date" className="date">
            </input>
            
            {/* <input type="text"
            onChange={(e) => handleInputChange(e)} name="category" value= {formData.category} placeholder="category">
            </input> */}

            <select id="categories" name="category" onChange={(e) => handleInputChange(e)}> 
            <option value={"Food"}>Food</option>
            <option value={"Travel"}>Travel</option>
            <option value={"Shopping"}>Shopping</option>
            <option value={"Others"}>Others</option>
            <option value={"Accommodation"}>Accommodation</option>
            </select>

            <input type="text"
            onChange={(e) => handleInputChange(e)} name="amount" value= {formData.amount} placeholder="amount">
            </input>
             {/* <input type="number"
            onChange={(e) => handleInputChange(e)} name="amount_native_currency" value= {formData.amount_native_currency} placeholder="amount native currency">
            </input> */}


           <input type="notes"
            onChange={(e) => handleInputChange(e)} name="notes" value= {formData.notes} placeholder="notes">
            </input>
            {/* <input type="number"
            onChange={(e) => handleInputChange(e)} name="wallet_id" value= {formData.wallet_id} placeholder="wallet">
            </input> */}
            <div class="col text-center">
            <button className="btn btn-light new-button" onClick={handleSubmit} type ="submit">
            submit
            </button>
            </div>
          </form>

            
        </div>
    )
}

export default NewTransaction;