import './App.css'

const Card = ({name="noName",price=0,image=""})=>{
    console.log(name,price,image);
    return(
        <>
        <div className="card">
            <img className="img" src={image}></img>
            <div className="detail">
                <p className="price">price : {price}</p>
                <p className="name">{name}</p>
            </div>
        </div>
        </>
    )
}

export default Card;