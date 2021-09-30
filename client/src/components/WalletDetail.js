import React, { useState } from 'react'

export const WalletDetail = ({expenses}) => {

    const [result, setResult] = useState([]);
    const onSelectItem = (id) => {
    // console.log(id);
    let result = expenses.filter(expense => expense.id === id)
    setResult(result);
    console.log(result[0].category);
  }

    return (
        <div>
             <h2>Transaction</h2>  
         <ul>
        {expenses.map((i) => 
        <li key={i.id} onClick={() => onSelectItem(i.id)}> {i.date} {i.category} | {i.notes} £{i.amount.toFixed(2)} | 
         {/* {(i.amount) / currency}   */}
         </li>)}
      </ul>
       
        </div>
    )
}

export default WalletDetail;
