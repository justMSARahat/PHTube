
function LoadCategory(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(resources => resources.json())
        .then(data => {
            console.log("Paisi Reh");
            showCategory(data.categories);
    });
}

LoadCategory();

showCategory = (buttons) => {
    CategoryContainer = document.getElementById('category_container');
    for(const button of buttons){
        const new_btn = document.createElement('button');
        new_btn.innerHTML = `<button class="btn btn-small">${button.category}</button>` ;

        CategoryContainer.appendChild(new_btn);
        console.log(button)
    }

}