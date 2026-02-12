import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Count {count}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          increase 
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          decrease 
        </button>
      </div>
    </>
  )
}

export default App
