import './App.css'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { CursorPagination } from './CursorPagination.jsx';

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

  // const { loading, error, data } = useQuery(GET_TODOS);

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {/* <div style={{ padding: '1rem' }}>
        <h1>Todos</h1>
        {data.getTodos.slice(0, 10).map((todo) => (
          <div key={todo.id} style={{ marginBottom: '1rem' }}>
            <strong>{todo.title}</strong>
            <div>Done: {todo.completed ? 'Yes' : 'No'}</div>
          </div>
        ))}
      </div> */}

      <CursorPagination />
    </>
  )
}

export default App
