const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const containerProducts = document.getElementById("cat-list-container-products");

let products = [];

fetch(API_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        products = data.products; // Almacenar los productos en la variable global

        // Función para actualizar la lista de productos mostrados
        const updateProductsList = () => {
            const searchText = searchProducts.value.toLowerCase();
            containerProducts.innerHTML = ""; // Limpiar el contenedor

            for (const product of products) {
                const productName = product.name.toLowerCase();
                const productDescription = product.description.toLowerCase();

                if (productName.includes(searchText) || productDescription.includes(searchText)) {
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
        };

        // Event listener para cambios en el campo de búsqueda
        searchProducts.addEventListener("input", updateProductsList);

        // Mostrar todos los productos al cargar la página
        updateProductsList();
    })
    .catch(error => {
        console.log("Error", error);
    });
