const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const containerProducts = document.getElementById("cat-list-container-products");
const sortAsc = document.getElementById('sortAsc');
const sortDesc = document.getElementById('sortDesc');
const sortByCount = document.getElementById('sortByCount');
const rangeFilterCountMin = document.getElementById('rangeFilterCountMin');
const rangeFilterCountMax = document.getElementById('rangeFilterCountMax');
const rangeFilterCount = document.getElementById('rangeFilterCount');
const clearRangeFilter = document.getElementById('clearRangeFilter');
//Función que muestra los productos, toma un array como parámetro, el array "data.products" que traemos de la API.
function showProducts(products){
    containerProducts.innerHTML = '';
    for (const product of products) {
        containerProducts.innerHTML += `
        <div class="row list-group-item d-flex justify-content-start">
            <div class="col-3"> <img src="${product.image}" class="img-thumbnail img-fluid"/> </div>
                <div class="col-8">
                    <h3>${product.name} - ${product.currency} ${product.cost}</h3>
                    <p>${product.description}</p>
                </div>
            <div class="col-1 text-muted p-0"> 
                <small>${product.soldCount} vendidos</small>
            </div>
        </div>
        `
    }
}