const categoryName = document.getElementById("categoryName");
const cat = localStorage.getItem("catID");
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${cat}.json`;
const containerProducts = document.getElementById(
  "cat-list-container-products"
);
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
  //Función que muestra los productos
  function showProducts(products) {
    containerProducts.innerHTML = "";
    for (const product of products) {
      containerProducts.innerHTML += `
      <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
          <div class="row">
              <div class="col-md-3">
                  <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
              </div>
              <div class="col-md-6">
                <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                  <small class="text-muted">${product.soldCount} artículos</small>
                </div>
                  <p class="mb-1">${product.description}</p>
              </div>
          </div>
        </div>
        `;
    }
  }

  //Función tiene que filtrar los productos por precio
  function applyAndShowFilter(products) {
    const minPrice = parseInt(rangeFilterCountMin.value);
    const maxPrice = parseInt(rangeFilterCountMax.value);
    let filteredProducts = products;

    //Si es NaN, devuelve True y queremos que devuelva False cuando no es un número lo ingresado, por lo tanto agreguamos un !
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filteredProducts = products.filter(
        (product) => product.cost >= minPrice && product.cost <= maxPrice
      );
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

  //Fetch donde se realizan los Listener y se llama a "showProducts()"
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      categoryName.innerText = data.catName;
      sortAsc.addEventListener("click", () =>
        applyAndShowFilter(data.products)
      );
      sortDesc.addEventListener("click", () =>
        applyAndShowFilter(data.products)
      );
      sortByCount.addEventListener("click", () =>
        applyAndShowFilter(data.products)
      );
      rangeFilterCount.addEventListener("click", () =>
        applyAndShowFilter(data.products)
      );
      clearRangeFilter.addEventListener("click", () => clear(data.products));
      searchProduct.addEventListener("input", () => searchBar(data.products));
      showProducts(data.products);
    })
    .catch((error) => {
      console.log("Error", error);
    });

  // Funcionaliad de Busqueda
  function searchBar(products) {
    const searchQuery = searchProduct.value.toLowerCase().trim();

    const filteredProducts = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productDescription = product.description.toLowerCase();
      return (
        productName.includes(searchQuery) ||
        productDescription.includes(searchQuery)
      );
    });

    applyAndShowFilter(filteredProducts);
  }
});

// Funcionaliad redirigir a info de producto
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}