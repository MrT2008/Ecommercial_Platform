import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fecthAPI = async () => {
    const response = await axios.get('http://localhost:8080/api');
    setArray(response.data.characters);
    console.log(response.data.characters);
  }

  useEffect(() => {
    fecthAPI();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Test API</h2>
        { 
          array.map((character, index) => (
            <div key={index}>
              <p>{character}</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
