class Category{
    /**
     * function to render on dropDown
     * @param {string} name name of option
     * @param {integer} id id of category
     */
    //funtion to show categories in DOM
    static #showDropdown(name,id){
        const dropdown = document.querySelector('#categories-dropdown');
        const option = document.createElement('option');
        option.value = id;
        option.text = name;
        dropdown.appendChild(option);
    }
    /**
     * 
     * @param {string} url url to request
     */
    static getAllCategories(url){
        fetch(`${url}/categories`)
        .then(categories => categories.json())
        .then(categories => {
            categories.data.map(category =>{
                this.#showDropdown(category.name,category.id);
            });
        })
        .catch(err => console.error(err));
    }


}