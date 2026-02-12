import {useState} from 'react'
function ControlledInpComp(){
    let [text,setText] = useState('');
    return(
       
        <div className="container"
         style={{backgroundColor : "rgba(37, 37, 37,0.9)",
                    margin:"auto",
                    height:"50vh",
                    width:"30rem",
                    display:"flex",
                    justifyContent:"space-evenly",
                    flexDirection:"column",
                    padding:"1rem",
                    alignItems:"center",
                    color:"white",
                    borderRadius: "40px"
            }}  
        >   Controlled Input
            <h1>{text}</h1>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="input" />
        </div>
       
    )
}

export default ControlledInpComp;