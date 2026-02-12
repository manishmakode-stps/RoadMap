let productsArray;

const getData = async (render) => {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        
        productsArray = data.products.map((item) => {
            return {
                title: item.title,
                price: item.price,
                desc: item.description,
                image: item.images[0] 
            };
        });
        
        console.log(productsArray);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    render();
}





const products = document.querySelector('.product_section');
const toggle = document.querySelector('#view');
const toggle_label = document.querySelector('#toggle_label');


function renderProducts() {

    // clear parent container();
    products.replaceChildren();

    productsArray.forEach(product => {

        const productCard = document.createElement('div');
        productCard.setAttribute('class', 'product_card');

        const image_container = document.createElement('div');
        image_container.setAttribute('class', 'img_container');

        const productImage = document.createElement('img');
        productImage.setAttribute('class', 'product_img');
        console.log(product.image);

        productImage.setAttribute('src', product.image);
        image_container.appendChild(productImage);

        const productDetail = document.createElement('div');
        const productTitle = document.createElement('div');
        productTitle.classList.add('title','content');
       
        productTitle.innerText = product.title;

        const productPrice = document.createElement('div');
        productPrice.classList.add('price','content');
        productPrice.innerText = ` price : ${product.price}`;

        const description = document.createElement('div');
        description.classList.add('content','desc');
        description.innerText = product.desc;

        productDetail.appendChild(productTitle);
        productDetail.appendChild(document.createElement('hr'));
        productDetail.appendChild(productPrice);
        productDetail.appendChild(document.createElement('hr'));
        productDetail.appendChild(description);


        productCard.appendChild(image_container);
        productCard.appendChild(document.createElement('hr'));
        productCard.appendChild(document.createElement('hr'));
        productCard.appendChild(productDetail);

        products.appendChild(productCard);
    });

}


window.addEventListener("load",()=>{
    getData(renderProducts);
})