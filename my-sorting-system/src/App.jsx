import { useState } from 'react'

import './App.css'

function App() {
  const [inputArray, setInputArray] = useState('');
  const [algorithm, setAlgorithm] = useState('bubble');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = async () => {
    setIsLoading(true);
    try {
      const array = inputArray.split(',').map(item => parseInt(item.trim()));
      
      const response = await fetch('http://localhost:5000/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          array: array,
          algorithm: algorithm
        }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Sorting System</h1>
      
      <div className="input-section">
        <label>
          Enter numbers (comma separated):
          <input
            type="text"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            placeholder="e.g., 5, 3, 8, 1, 2"
          />
        </label>
      </div>
      
      <div className="algorithm-section">
        <label>
          Select sorting algorithm:
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
          </select>
        </label>
      </div>
      
      <button onClick={handleSort} disabled={isLoading}>
        {isLoading ? 'Sorting...' : 'Sort'}
      </button>
      
      {result && (
        <div className="result-section">
          <h2>Results</h2>
          <p><strong>Algorithm:</strong> {result.algorithm}</p>
          <p><strong>Original Array:</strong> [{result.original.join(', ')}]</p>
          <p><strong>Sorted Array:</strong> [{result.sorted.join(', ')}]</p>
        </div>
      )}
    </div>
  );
}

export default App;