import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';

export const ExchangeRates = () => {
    const [liveCurrency, setLiveCurrency] = useState (0);
    const [liveCurrency1, setLiveCurrency1] = useState (0);
    const [liveCurrency2, setLiveCurrency2] = useState (0);
    const [liveCurrency3, setLiveCurrency3] = useState (0);
    const [liveCurrency4, setLiveCurrency4] = useState (0);

    async function getCurrency() {
    let currency_url1 = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=GBP&apikey=4E8ZBH6BEU83RWHA`;

    // let currency_url3 = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=IDR&to_currency=USD&apikey=4E8ZBH6BEU83RWHA`;
    // let currency_url4 = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=4E8ZBH6BEU83RWHA`;


    try {
    let response = await fetch(currency_url1);
    if(response.ok) {
    let currencyResult = await response.json();
    let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    console.log(currency);
    setLiveCurrency1(currency)
     } else {
    // setError ("server error")
  }
    } catch (err) {
    // setError("network error");
    }
    
 
}

    async function getCurrency2() {
        let currency_url2 = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=GBP&to_currency=EUR&apikey=4E8ZBH6BEU83RWHA`;


        try {
        let response = await fetch(currency_url2);
        if(response.ok) {
        let currencyResult = await response.json();
        let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        console.log(currency);
        setLiveCurrency2(currency)
        } else {
        // setError ("server error")
    }
        } catch (err) {
        // setError("network error");
        }
    
    }

    async function getCurrency3() {
        let currency_url3 = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=GBP&to_currency=IDR&apikey=4E8ZBH6BEU83RWHA`;


        try {
        let response = await fetch(currency_url3);
        if(response.ok) {
        let currencyResult = await response.json();
        let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        console.log(currency);
        setLiveCurrency3(currency)
        } else {
        // setError ("server error")
    }
        } catch (err) {
        // setError("network error");
        }
    
    }


    async function getCurrency4() {
        let currency_url4 = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=GBP&to_currency=JPY&apikey=4E8ZBH6BEU83RWHA`;


        try {
        let response = await fetch(currency_url4);
        if(response.ok) {
        let currencyResult = await response.json();
        let currency = currencyResult["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        console.log(currency);
        setLiveCurrency4(currency)
        } else {
        // setError ("server error")
    }
        } catch (err) {
        // setError("network error");
        }
    
    }

    
    useEffect(() => {
    getCurrency();
    getCurrency2();
    getCurrency3();
    getCurrency4();

  }, []);


    return (
        <div>
         <h2 className="exchange">Live exchange rates</h2>

         <div className="nav"  > <p> <Link className="menu-nav-exchange" to={`/`} > &lt; wallets </Link>
        </p> 
        </div>
        <div className="exchange-display">
        <p> 1 GBP = {liveCurrency1} USD </p>
        <p> 1 GBP = {liveCurrency2} EUR </p>
        <p> 1 GBP = {liveCurrency3} IDR </p>
        <p> 1 GBP = {liveCurrency4} JPY </p>
        </div>
   
        </div>
    )
}

export default ExchangeRates;
