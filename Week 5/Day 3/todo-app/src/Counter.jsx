import { useReducer } from "react";

function Counter(){
    const [state,countDisp] = useReducer((state,action)=>{
        if(action.opr == "inc") return {count:state.count +1};
        else if(action.opr == "dec") return {count:state.count -1};
        else if(action.opr == "res") return {count:0};
        else return state;
    },{count:0})
    return(
        <>
        <h1>Current Count : {state.count}</h1>
        <button onClick={()=>{ return countDisp({opr:"inc"})}}>Increase</button>
        <button onClick={()=>{ return countDisp({opr:"dec"})}}>Decrease</button>
        <button onClick={()=>{ return countDisp({opr:"res"})}}>Reset</button>
        </>
    )
}

export default Counter;