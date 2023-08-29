const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const containerProducts = document.getElementById("containerProducts");

fetch (API_URL)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        for (const product of data.products) {
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
    })
    .catch(error =>{
        console.log("Error", error);
    })

// A partir de acá creo funcionalidad de ordenar por precio (Revisar todo a partir de aca)

const ORDER_ASC_BY_PRECIO = "1-2";
const ORDER_DESC_BY_PRECIO = "2-1";
const ORDER_BY_RELEVANCIA = "Rel.";

const ORDER_ASC_BY_PRECIO_BUTON = document.getElementById('sortAscPrecio');
const ORDER_DESC_BY_PRECIO_BUTON = document.getElementById('sortDescPrecio');
const ORDER_BY_RELEVANCIA_BUTON = document.getElementById('sortByRel');

let currentProductsArray = [];
let currentSortCriterio = undefined;
let minPrecio = undefined;
let maxPrecio = undefined;

function sortPrecios(criterio, array){
    let arrayOrdenado = [];
    if (criterio === ORDER_ASC_BY_PRECIO)
    {
        arrayOrdenado = array.sort(function(a, b) {
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_DESC_BY_PRECIO){
        arrayOrdenado = array.sort(function(a, b) {
            if ( parseInt(a.cost) > parseInt(b.cost) ){ return -1; }
            if ( parseInt(a.cost) < parseInt(b.cost) ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_BY_RELEVANCIA){
        arrayOrdenado = array.sort(function(a, b) {
            if ( parseInt(a.soldCount) > parseInt(b.soldCount) ){ return -1; }
            if ( parseInt(a.soldCount) < parseInt(b.soldCount) ){ return 1; }
            return 0;
        });
    }

    return arrayOrdenado;
}

//function setCatID(id) {
//    localStorage.setItem("catID", id);
//    window.location = "products.html"
//}

function showPreciosList(){

    let htmlContentToShow = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseFloat(product.minPrice) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseFloat(product.maxPrice) <= maxPrice))){

            htmlContentToShow += `
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

        document.getElementById("containerProducts").innerHTML = htmlContentToShow;
    }
}

function sortAndShowProducts(sortCriterio, productsArray){
    currentSortCriterio = sortCriterio;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortPrecios(currentSortCriterio, currentProductsArray);

    //Muestro los categorías ordenadas
    showPreciosList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data
            showPreciosList()
            //sortAndShowProducts(ORDER_ASC_BY_PRECIO, resultObj.data); (?)
        }
    });

    document.getElementById("sortAscPrecio").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_RELEVANCIA);
    });

    document.getElementById("sortDescPrecio").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRECIO);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });
    
    document.getElementById("clearRangeFilterPrecio").addEventListener("click", function(){
        document.getElementById("rangeFilterPrecioMin").value = "";
        document.getElementById("rangeFilterPrecioMax").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        showPreciosList();
    });

    document.getElementById("rangeFilterPrecio").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        minPrecio = document.getElementById("rangeFilterPrecioMin").value;
        maxPrecio = document.getElementById("rangeFilterPrecioMax").value;

        if ((minPrecio != undefined) && (minPrecio != "") && (parseFloat(minPrecio)) >= 0){
            minPrecio = parseFloat(minPrecio);
        }
        else{
            minPrecio = undefined;
        }

        if ((maxPrecio != undefined) && (maxPrecio != "") && (parseFloat(maxPrecio)) >= 0){
            maxPrecio = parseFloat(maxPrecio);
        }
        else{
            maxPrecio = undefined;
        }

        showPreciosList();
    });
});