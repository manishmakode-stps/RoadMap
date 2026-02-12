import productsArray from './products.js';

const products = document.querySelector('.product_section');
const category = document.querySelector('#category');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const toggle = document.querySelector('#view');
const toggle_label = document.querySelector('#toggle_label');

// console.log(toggle);


function renderProducts(productsList){

    // clear parent container();
    products.replaceChildren();

    productsList.forEach(product => {
        
    const productCard = document.createElement('div');
    productCard.setAttribute('class','product_card');
    
    const image_container = document.createElement('div');
    image_container.setAttribute('class','img_container');
    
    const productImage = document.createElement('img');
    productImage.setAttribute('class','product_img');
    console.log(product.image);
    
    productImage.setAttribute('src',product.image);
    image_container.appendChild(productImage);
    
    const productDetail = document.createElement('div');
    const productTitle = document.createElement('p');
    productTitle.setAttribute('class','title');
    productTitle.innerText = product.title;

    const productPrice = document.createElement('p');
    productPrice.setAttribute('class','price');
    productPrice.innerText = product.price;

    const productStock = document.createElement('p');
    productStock.setAttribute('class','stock');
    productStock.innerText = "Stock : "+product.available_stock;

    productDetail.appendChild(productTitle);
    productDetail.appendChild(productPrice);
    productDetail.appendChild(productStock);


    productCard.appendChild(image_container);
    productCard.appendChild(productDetail);

    products.appendChild(productCard);
    });

}

// function updateList(productList){
        // combine both filter and sorting using global states
// }
category.addEventListener('change',(e)=>{
        const selectedCategory = e.target.value;
        if(selectedCategory === "all"){
            renderProducts(productsArray);
        }else{
            const filtered = productsArray.filter(product =>{
                if(product.category === selectedCategory) return true;
            });
            renderProducts(filtered);
        }
})

search.addEventListener('input',(e)=>{
    const searchedProduct = e.target.value.toLowerCase();
    console.log("Searched text ",searchedProduct);
    
    if(searchedProduct === ""){
        renderProducts(productsArray);
    }else{
        const filtered = productsArray.filter(product=>{
            return product.title.toLowerCase().includes(searchedProduct);
        });
        console.log(filtered);
        
        renderProducts(filtered);
    }
})

sort.addEventListener('change',(e)=>{
        const sortBy = e.target.value;
        if(sortBy === "Low to High"){
            let sortedProducts  = productsArray.toSorted((a,b)=>a.price-b.price)
            renderProducts(sortedProducts)
        }else if(sortBy === "High to Low"){
            let sortedProducts  = productsArray.toSorted((a,b)=>b.price-a.price)
            renderProducts(sortedProducts)
        }
})

toggle.addEventListener('change',(e)=>{

    if(e.target.checked === true){
        products.classList.add('class','list_view');
        toggle_label.innerText = "Grid";
    }else{
        products.classList.remove('class','list_view');
        toggle_label.innerText = "List";
    }

})

renderProducts(productsArray);
