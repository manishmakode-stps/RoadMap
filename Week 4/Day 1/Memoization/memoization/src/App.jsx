import { useState, useMemo, useCallback, React, memo } from 'react'
import './App.css'

function App() {
  return (
      <Parent/>
  )
}

export default App

function Parent(){

  const [count,setCount] = useState(0)

  // Memoized Object
  const user = useMemo(()=>{
    return {name:"manish"}
  },[])

  // Memoized Function
  const handleClick = useCallback(()=>{
    console.log("Button Click");
  },[])

  return(
    <>
    <h1>Count : {count}</h1>
    <button onClick={()=>setCount(count+1)}>Increase</button>
    <Child  user={user} onClick={handleClick}/>
    </>
  )

}

const Child =  React.memo(({user,onClick})=>{
      console.log("Child Rendered");
      
      return(
        <div>
          <h3>User: {user}</h3>
          <button onClick={onClick}>Child Button</button>
        </div>
      )
})