import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";

function App() {

const getUsers = () => {
  console.log('hi')
    fetch("/users")
      .then((response) => response.json())
      .then(json => {
        // upon success, update tasks
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };


useEffect(() => {
    console.log("goodbye")
    getUsers();
  }, []);
 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
