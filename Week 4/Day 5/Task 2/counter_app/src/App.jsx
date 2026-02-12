import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileCard from './ProfileCard'
function App() {
  const [count, setCount] = useState(0)
  const imageUrl = "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg"
  return (
    <>
    <div className="container">
    <ProfileCard image={imageUrl} name={"Manish"} biodata={"Aspiring Software Developer"} />
    <ProfileCard image={imageUrl} name={"Manish"} biodata={"Aspiring Software Developer"} />
    <ProfileCard image={imageUrl} name={"Manish"} biodata={"Aspiring Software Developer"} />
    </div>
      {/* <h1>{count}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          increase
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          decrease
        </button>
      </div> */}
    </>
  )
}

export default App
