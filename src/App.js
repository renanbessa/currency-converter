import { useEffect, useState } from 'react';
import { CurrencyRow } from './components/CurrencyRow';
import axios from 'axios';

function App() {
  const [rates, setRates] = useState([]);

  const baseURL = 'http://api.exchangeratesapi.io/';
  const apiKey = '5b5f6aab54b9f47c0ef54fad8d66be41';

  const getAllRates = () => {
    axios
      .get(`${baseURL}v1/latest?access_key=${apiKey}`)
      .then((response) => {
        const allRates = response.data;
        setRates(allRates);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getAllRates();
  }, []);

  console.log(rates);

  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </div>
  );
}

export default App;
