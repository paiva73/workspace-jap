
const productID = localStorage.getItem("productID");
const API_URL = `https://japceibal.github.io/emercado-api/cats_products/${cat}.json`; //No se si está bien usar ${cat}

// Hacer la solicitud fetch a la API
fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`La solicitud fetch falló con estado ${response.status}`);
    }
    return response.json(); // Parsear la respuesta JSON
  })
  .then(data => {
    // Buscar el objeto con "id" igual a productID
    const product = data.products.find(item => item.id === productID);
    showProductInfo()
    if (product) {
      // El objeto con "id": productID fue encontrado
      console.log(product);
    } else {
      // No se encontró ningún objeto con ese "id"
      console.log("Producto no encontrado");
    }
  })
  .catch(error => {
    console.error("Error al obtener datos de la API:", error);
  });


function showProductInfo(id){

    containerProductInfo.innerHTML += `
    <h2>products.name</h2>
    <h3>precio</h3>
    <p>${products.cost}</p>
    <br>
    `;
}

  