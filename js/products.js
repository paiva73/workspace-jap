const categoryName = document.getElementById("categoryName"); //ESTA VARIABLE SE USA EN DATA PARA DARLE NOMBRE A LA CATEGORIA
const cat = localStorage.getItem("catID");
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${cat}.json`;
const containerProducts = document.getElementById("cat-list-container-products");
const sortAsc = document.getElementById("sortAsc");
const sortDesc = document.getElementById("sortDesc");
const sortByCount = document.getElementById("sortByCount");
const rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
const rangeFilterCountMax = document.getElementById("rangeFilterCountMax");
const rangeFilterCount = document.getElementById("rangeFilterCount");
const clearRangeFilter = document.getElementById("clearRangeFilter");
const searchProduct = document.getElementById("searchProduct");

//Función que muestra los productos, toma un array como parámetro, el array "data.products" que traemos de la API.
document.addEventListener("DOMContentLoaded", () => {

  let data;
  function showProducts(products) {
    containerProducts.innerHTML = "";
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
        `;
    }
  }

  //Esta función tiene que filtrar los productos por precio
  function applyAndShowFilter(products) {
        const minPrice = parseInt(rangeFilterCountMin.value);
        const maxPrice = parseInt(rangeFilterCountMax.value);
        let filteredProducts = products;

        //Si es NaN, devuelve True y queremos que devuelva False cuando no es un número lo ingresado, por lo tanto agreguamos un !
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            filteredProducts = products.filter((product) => product.cost >= minPrice && product.cost <= maxPrice);
        }

        //A continuación vamos a crear el sort para que filtre por precio y cantidad vendidos.
        if (sortAsc.checked) {
        filteredProducts.sort((a, b) => a.cost - b.cost);
        } else if (sortDesc.checked) {
        filteredProducts.sort((a, b) => b.cost - a.cost);
        } else if (sortByCount.checked) {
        filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
        }

        showProducts(filteredProducts);
    }

  //Función para el boton limpiar.
  function clear(products) {
    rangeFilterCountMin.value = "";
    rangeFilterCountMax.value = "";
    showProducts(products);
  }

  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      data = responseData;
      categoryName.innerText = data.catName;
      sortAsc.addEventListener("click", () => applyAndShowFilter(data.products));
      sortDesc.addEventListener("click", () => applyAndShowFilter(data.products));
      sortByCount.addEventListener("click", () => applyAndShowFilter(data.products));
      rangeFilterCount.addEventListener("click", () => applyAndShowFilter(data.products));
      clearRangeFilter.addEventListener("click", () => clear(data.products));
      showProducts(data.products);
    })
    .catch((error) => {
      console.log("Error", error);
    });

  // Funcionaliad de Busqueda
  searchProduct.addEventListener("input", () => {
    const searchQuery = searchProduct.value.toLowerCase().trim();
    if (data) { // Check if data is defined
      const filteredProducts = data.products.filter((product) => {
        const productName = product.name.toLowerCase();
        const productDescription = product.description.toLowerCase();
        return productName.includes(searchQuery) || productDescription.includes(searchQuery);
      });
      applyAndShowFilter(filteredProducts);
    }
  });
});
