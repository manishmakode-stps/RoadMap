import { useState } from 'react'

function ToDoListItems({ value, indexNumber, todoList, setTodolist }) {

  let [status,setStatus] = useState(false);

  let deletRow = (event) => {

    event.stopPropagation();

    let finalData = todoList.filter((data, index) => {
      return index != indexNumber;
    })
    setTodolist(finalData);
  }

  let checkStatus = ()=>{
      setStatus(!status);
  }

  return (
    <li onClick={checkStatus} className={(status)?'completetodo':''}>{value} <span onClick={deletRow}>&times;</span></li>
  )
}

export default ToDoListItems;