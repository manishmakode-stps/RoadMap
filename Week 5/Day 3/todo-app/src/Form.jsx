import { useReducer } from "react";
function Form(){

    function reducer(formData,action){
        return{
            ...formData,
            [action.name]: action.value
        }
    }

    const [formData,dispatch] = useReducer(reducer,{username:"",email:""})
    

    function handleChange(e){
        dispatch({
            name: e.target.name,
            value: e.target.value
        })
    }

    return(
        <form action="">
            <input type="text" 
            placeholder="Username" value={formData.username} 
            name="username"
            onChange={handleChange}/>
            
            <input type="email" 
            placeholder="Email" value={formData.email} 
            name="email"
            onChange={handleChange} />

            <p>Name is {formData.username}</p>
            <p>Email is {formData.email}</p>
            
        </form>
    )
}

export default Form;