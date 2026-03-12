import { useReducer } from "react";

function TodoApp() {



    function reducer(state, action) {
        switch (action.type) {
            case 'ADD_TASK': {
                if(action.payload != "")
                return [
                    ...state,
                    {
                        id: state.length + 1,
                        name: action.payload
                    }
                ]
            }
            case 'DELETE_TASK': return state.filter((task) => task.id !== action.payload)

            default: return state
        }
    }
    const initialState = [];
    function init(initialStete){
        const result = [...initialState, {id:1,name:"playing"}]
        return result
    }
    // third argument is a method used to initialize the state
    const [todos, dispatch] = useReducer(reducer, initialState, init);

    return (
        <>
            <h4>Todo List {todos.length}</h4>

            Add new Task :
            <input type="text"
                onBlur={(e) => dispatch(
                    { type: 'ADD_TASK', payload: e.target.value }
                )} />
            <hr />
            {todos.map((todo) => {
                return <li key={todo.id}>{todo.name} <span><button onClick={() => dispatch({ type:'DELETE_TASK', payload:todo.id})} >Delete</button></span> </li>
            })}
        </>
    )
}

export default TodoApp;