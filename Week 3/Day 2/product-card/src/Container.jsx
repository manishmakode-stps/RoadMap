import Card from './Card.jsx'
import product from './product.js'
import './App.css'

function Container(){
    return(
        <div className="container">
            {product.map((element,index) => (
                // console.log(element);
                <Card 
                key={index}
                name={element.name}
                price={element.price} 
                image={element.image} />
            ))} 
        </div>
    )
}  

export default Container;