class Product{
    /**
     * private static Function to render in DOM 
     * @param {string} name Name of product to show in dom
     * @param {decimal} price Price of product to show in dom
     * @param {string} imageUrl URL of product to show in dom
     */
    static #showDOM(name,price,imageUrl){
        const cards = document.querySelector('#cards'); // get card's container
        cards.innerHTML += `
            <div class="card mb-2 card-bsale" style="width: 18rem;">
                <img src=${imageUrl} class="card-img-top" alt="..." style="height: 300px;">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div class="card-body d-flex justify-content-around">
                    <h5 class="card-link">$/. ${price}</h5>
                    <a href="#" class="card-link"><i class="fas fa-shopping-cart"></i></a>
                </div>
            </div>
        `;
    }
    /**
     * private static to function to clear 
     * @param {string} id - name of element of dom to clear
     */
    static #clearDOM(id){
        const element = document.querySelector(`#${id}`);
        element.innerHTML='';
    }
    /**
     * 
     * @param {string} message message to show in error alert
     */
    static #showError(message){
        const alert = document.querySelector('#alert-error');
        const messageAlert = document.querySelector('#alert-message');
        messageAlert.innerHTML = message
        alert.classList.remove('hide');
        alert.classList.add('show');
        throw new Error(message);
    }
    /**
     * 
     * @param {boolean} status boolean to determinate to show loading effect
     */
    static #loading(status){
        const spinner = document.querySelector('#spinner');
        if(status){
            spinner.classList = 'show';
        }else{
            spinner.classList = 'hide';
            
        }
    }
    /**
     * // static function to get all products and print in dom
     * @param {string} url - url api  to get all products
     * @param {integer} page - number of page to get data
     */
    static async getAllProducts(url,page=1,name=''){
        let data = []; // set variable that contain all products
        let products =[]; // set variable that contain paginate and products
        // clear cards  
        this.#clearDOM('cards');  
        //verify if localStorage get products
        try{
            this.#loading(true);//start loading effect
            if(localStorage.getItem('products') === null){
                const result = await fetch(`${url}/products?page=${page}&name=${name}`); //request all products
                //if exists error from server show message to error
                if(!result.ok){
                    this.#loading(false);//end loading effect
                    this.#showError('El l??mite de usuarios conectados a la base de datos por hora ha sido excedido, intente m??s rato!.');

                }
                products = await result.json(); //transform in JSON format
                data = products.data; // extract products
                //load data in storage 
                localStorage.setItem('products', JSON.stringify(products));
            }else{
                // get data from localStorage
                products = JSON.parse(localStorage.getItem('products')); 
                data = products.data;
                console.log('From localStorage');
            }
            this.#loading(false);// end loading effect

        }catch(err){
            err => console.error('Error',err)
        }

        //Render Pagination
        this.#pagination(products.totalItems,products.totalPages,products.currentPage,url);
        
        // render all products in DOM
        return data.map(({name,price,url_image}) =>{
            //render into DOM
            this.#showDOM(name,price,url_image);
        });
    }
   
    //function to get product by name
    /**
     * 
     * @param {string} url url api to get product by name,price,
     * @param {string} name name of product that should search
     * @param {integer} page number of page to get data
     */
    static async getProductByName(url,name,page=1){
        this.#clearDOM('cards'); // clear cards   
        try{
            this.#loading(true);//start loading effect
            const result = await fetch(`${url}/products?page=${page}&name=${name}`);
            //if exists error from server show message to error
            if(!result.ok){
                this.#showError('El l??mite de usuarios conectado a la base de datos a excedido, esperar por favor!.');
            }
            const products = await result.json();
            const data = products.data;
            //show message if not found products    
            if(data.length === 0){
                this.#showError('No contamos con ese producto.');
            }
            this.#loading(false);// end loading effect

            //Render Pagination
            this.#pagination(products.totalItems,products.totalPages,products.currentPage,url,name);
            
            // render all products in DOM
            return data.map(({name,price,url_image}) =>{
                this.#showDOM(name,price,url_image);
            });
        }catch(err){
            err => console.error('Error',err)
        }
    }
    //function to get product by category
    static getProductByCategory(url,category,page=1){
        this.#loading(true);//start loading effect
        //CLEAR PRODUCTS
        this.#clearDOM('cards');

        fetch(`${url}/categories/${category}/products?page=${page}`)
        .then(products => products.json())
        .then(products => {
            const data = products.data;
            //Render Pagination
            this.#pagination(products.totalItems,products.totalPages,products.currentPage,url,'',category);
            //SHOW PRODUCTS BY NAME
            return data.map(({name,price,url_image}) =>{
                this.#showDOM(name,price,url_image);
            });
        })
        .catch(err => console.error(err))
        .finally(() => {
            this.#loading(false);// end loading effect
        });
    }

    /**
     * Function to show pagination
     * @param {integer} totalItems Total of elements to display
     * @param {integer} totalPages Total pages
     * @param {integer} currentPage Current Page
     * @param {string} url URL to request elements
     * @param {string} name name of product that filter to products
     * @param {string} category name of category that filter to product
     */
    static #pagination(totalItems,totalPages,currentPage,url,name='',category=''){
        //get element of DOM
        const pagination = document.querySelector('#pagination');
        //clear dom paginate
        pagination.innerHTML ='';
        //loop to print to total
        for(let i = 1; i <= totalPages; i++){
            let pageContainer = document.createElement('li')
            let page = document.createElement('div');
            pageContainer.classList = 'page-item';
            page.classList = 'page-link';
            page.innerHTML = i;
            //adding evento of click to fetch new data
            page.onclick = ()=>{
                // clear localStorage because to get new data from other page
                localStorage.clear();
                // define what method to call, if use name filter or only fetch products
                if(name!==''){
                    this.getProductByName(url,name,i);
                }else if(category!==''){
                    this.getProductByCategory(url,category,i);
                }else{
                    this.getAllProducts(url,i)
                }
            };
            //if current page is equal to number paginate no should request again only get data from localStorage
            if(i === +currentPage){
                pageContainer.classList = 'page-item active';
                page.onclick = ()=>{
                    this.getAllProducts(url,i);
                };
            }
            //DOM
            pageContainer.appendChild(page);
            pagination.appendChild(pageContainer);
        }
    }
}