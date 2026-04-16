import { useState } from 'react'
import './App.css'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
    }
  }
`;


function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount((prev) => prev + 1)
  }




  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>





  return (
    <>
      {/* <section id="center">
        <h1>{count}</h1>
        <button
          className="counter"
          onClick={handleClick}
        >
          Click
        </button>
      </section> */}

      <div style={{ padding: '1rem' }}>
        <h1>Todos</h1>
        {data.getTodos.slice(0, 10).map((todo) => (
          <div key={todo.id} style={{ marginBottom: '1rem' }}>
            <strong>{todo.title}</strong>
            <div>Done: {todo.completed ? 'Yes' : 'No'}</div>
            {/* <div>User: {todo.user?.name ?? 'N/A'}</div> */}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
