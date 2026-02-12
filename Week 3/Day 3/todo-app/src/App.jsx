import { useState } from 'react'
import './App.css'
import ToDoListItems from './ToDoListItems';

function App() {
  let [todoList, setTodolist] = useState([]);

  let saveTodoList = (event) => {
    event.preventDefault();

    let toname = event.target.toname.value;

    if (!todoList.includes(toname) && toname) {
      let finalTodolist = [...todoList, toname];
      setTodolist(finalTodolist);
    } else {
      alert("ToDo Already exist")
    }
    event.target.reset();

  }

  let list = todoList.map((value, index) => {
    return (
      <ToDoListItems
        value={value}
        key={index}
        indexNumber={index}
        todoList={todoList}
        setTodolist={setTodolist}
      />
    )
  })

  return (
    <div className="app">
      <h1>To-Do App</h1>
      <form onSubmit={saveTodoList}>
        <input type="text" name="toname" /><button type='submit'>Save</button>
      </form>

      <div className="outerDiv">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  )
}
export default App
