import React, { useState } from 'react';
import './App.css';

function App() {
  const [number, setnumber] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (!['primes','fibo','even','rand'].includes(number)) {
      alert('Invalid number ID. Use "primes","fibo","even","rand"');
      return;
    }
    try {
      const response = await fetch(`http://localhost:9876/numbers/${number}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Average Calculator</h1>
        <input
          type="text"
          value={number}
          onChange={(e) => setnumber(e.target.value)}
          placeholder="Enter number ID "
        />
        <button onClick={fetchData}>Fetch Numbers</button>
        {data && (
          <div>
            <h2>Results</h2>
            <p><strong>Previous Window State:</strong> {JSON.stringify(data.windowPrevState)}</p>
            <p><strong>Current Window State:</strong> {JSON.stringify(data.windowCurrState)}</p>
            <p><strong>Numbers:</strong> {JSON.stringify(data.numbers)}</p>
            <p><strong>Average:</strong> {data.avg}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;