//API URL
const URL_BASE = 'http://localhost:5000/apiv1';
// const URL_BASE = 'https://bsalebackend2022.herokuapp.com/apiv1';


window.addEventListener("load", ()=>{

    //start page 
    Product.getAllProducts(URL_BASE); // GET ALL PRODUCTS FROM API (20 per page)
    Category.getAllCategories(URL_BASE);// GET ALL CATEGORIES FROM API TO DROPDOWN

    // start search products 
    const buttonSerch = document.querySelector('#nav-search-btn');
    const inputSearch = document.querySelector('#nav-search-input');
    const alert = document.querySelector('#alert-error');
    const dropdown = document.querySelector('#categories-dropdown');
    // filter products by name
    buttonSerch.addEventListener('click', (e)=>{
        e.preventDefault();
        const name = inputSearch.value;
        alert.classList.add('hide');
        Product.getProductByName(URL_BASE,name); // GET PRODUCT by name
    });

    // change category and filter products
    dropdown.addEventListener('change', (e)=>{
        if(e.target.value === '0'){
            Product.getAllProducts(URL_BASE); // GET ALL PRODUCTS FROM API (15 per page)
            category_id = 0;
        }else{
            Product.getProductByCategory(URL_BASE,e.target.value);
            category_id = e.target.value;
        }
    });

    //clear localStore
    setTimeout(()=>{
        localStorage.clear();
    },60000)
});