import './App.css';
import React, { useEffect, useState} from "react";

function App() {

const [wallets, setWallets] = useState([]); 

const getUsers = () => {
  // console.log('hi')
    fetch("/wallets")
      .then((response) => response.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
        setWallets(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };


useEffect(() => {
    // console.log("goodbye")
    getUsers();
  }, []);
 

  return (
    <div className="App">
      <h1> TRAVEL EXPENSE TRACKER APP</h1>
    </div>
  );
}

export default App;
