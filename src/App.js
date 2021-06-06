import { useEffect, useState } from 'react';
import { CurrencyRow } from './components/CurrencyRow';
import axios from 'axios';

function App() {
  const [rates, setRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const baseURL = 'http://api.exchangeratesapi.io/';
  const apiKey = '5b5f6aab54b9f47c0ef54fad8d66be41';

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const getAllRates = () => {
    axios
      .get(`${baseURL}v1/latest?access_key=${apiKey}`)
      .then((response) => {
        const allRates = response.data.rates;
        const baseRate = response.data.base;
        const firstCurrency = Object.keys(allRates)[0];

        setRates([baseRate, ...Object.keys(allRates)]);
        setFromCurrency(baseRate);
        setToCurrency(firstCurrency);
        setExchangeRate(allRates[firstCurrency]);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getAllRates();
  }, []);

  // useEffect(() => {
  //   if (fromCurrency !== null && toCurrency !== null) {
  //     axios
  //       .get(`${baseURL}v1/latest?access_key=${apiKey}&base=${fromCurrency}&symbols=${toCurrency}`)
  //       .then((response) => {
  //         const allRates = response.data.rates;
  //         const ExchangeRate = allRates[toCurrency];

  //         setExchangeRate(ExchangeRate);
  //       })
  //       .catch((error) => console.error(`Error: ${error}`));
  //   }
  // }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow
        rates={rates}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount.toString() || fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        rates={rates}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount.toString() || toAmount}
      />
    </div>
  );
}

export default App;
