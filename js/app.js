//API URL
const URL_BASE = 'http://localhost:5000/apiv1';
// const URL_BASE = 'https://bsalebackend2022.herokuapp.com/apiv1';

// const URL_PRODUCTS= `${URL_BASE}/products`;
// const URL_CATEGORIES = `${URL_BASE}/categories`;

window.addEventListener("load", ()=>{

    //start page 
    Product.getAllProducts(URL_BASE); // GET ALL PRODUCTS FROM API (20 per page)

    // start search products 
    const buttonSerch = document.querySelector('#nav-search-btn');
    const inputSearch = document.querySelector('#nav-search-input');
    buttonSerch.addEventListener('click', (e)=>{
        e.preventDefault();
        const name = inputSearch.value;
        Product.getProductByName(URL_BASE,name); // GET PRODUCT by name
    });

    setTimeout(()=>{
        localStorage.clear();
    },60000)
});