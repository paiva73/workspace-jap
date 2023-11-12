const productID = localStorage.getItem("productID");
const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const API_URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
const catID = localStorage.getItem("catID");
const API_URL_PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
const containerProduct = document.getElementById("containerProductInfo");
const containerComments = document.getElementById("containerComments");
const btnSend = document.getElementById("btnSend");
const comments = JSON.parse(localStorage.getItem('comments')) || [];
const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

//Escuchamos el evento DOMContentLoaded para recién ahí, llamar a las funciones que muestran los productos y comentarios.
document.addEventListener("DOMContentLoaded", () => {
    getAndShowProductsInfo(API_URL);
    getAndShowRelationProducts(API_URL_PRODUCTS);
    getAndShowComments(API_URL_COMMENTS);
})

//Función asíncrona que muestra la card generada del producto, utilizando el endpoint del producto pertinente.
async function getAndShowProductsInfo(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Hubo un problema con la solicitud: ${response.status}`);
        }
        const data = await response.json();
        showProduct(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

//Función que genera la "card" del producto.
function showProduct(product) {
  console.log(product);
  containerProduct.innerHTML = `
    <div class="row pt-5 pb-5">
      <h1 class="h2 col-9">${product.name}</h1>
      <div class="col-lg-3">
      <button type="button" class="btn btn-success w-25 px-2" style="min-width: 100px;" id="btnBuy">Comprar</button>
      </div>
    </div>
    <hr class="m-0">
    <div class="row">
      <div class="my-4">
        <h6 class="mb-0"><b>Precio</b></h6>
        <small>${product.currency} ${product.cost}</small>
      </div>
      <div class="mb-4">
        <h6 class="mb-0"><b>Descripción</b></h6>
        <small>${product.description}</small>
      </div>
      <div class="mb-4">
        <h6 class="mb-0"><b>Categoría</b></h6>
        <small>${product.category}</small>
      </div>
      <div class="mb-4">
        <h6 class="mb-0"><b>Cantidad vendidos</b></h6>
        <small>${product.soldCount}</small>
      </div>
      <div class="mb-2">
        <h6 class="mb-2"><b>Imágenes ilustrativas</b></h6>
        ${generateImageCarousel(product.images)}
      </div>
    </div>
  `;
  document.getElementById('btnBuy').addEventListener('click', () => {
    addToCart(product);
  })
}

// Función para crear el carrusel de imágenes
function generateImageCarousel(images) {
  // Verifica si no se proporcionaron imágenes o si el arreglo está vacío
  if (!images || images.length === 0) {
    return ''; // Retorna una cadena vacía si no hay imágenes
  }

  // Genera los indicadores del posición dentro del carrusel
  const carouselIndicators = images.map((image, i) => `
    <button
      type="button"
      data-bs-target="#productImageCarousel"
      data-bs-slide-to="${i}"
      class="${i === 0 ? 'active' : ''}"
      aria-current="${i === 0 ? 'true' : 'false'}"
      aria-label="Slide ${i + 1}"
    ></button>`).join('');

  // Genera el contenido dentro del carrusel
  const carouselInner = images.map((image, i) => `
    <div class="carousel-item ${i === 0 ? 'active' : ''}">
      <img src="${image}" class="d-block w-100" alt="Image ${i + 1}">
    </div>`).join('');

  // Retorna el carrusel completo en forma de cadena HTML
  return `
    <div id="productImageCarousel" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel" style="max-width: 50rem;">
      <ol class="carousel-indicators">${carouselIndicators}</ol>
      <div class="carousel-inner">${carouselInner}</div>
      <a class="carousel-control-prev" href="#productImageCarousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a class="carousel-control-next" href="#productImageCarousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </div>`;
}

//Función asíncrona que muestra los comentarios generados, utilizando el endpoint de los comentarios.
async function getAndShowComments(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Hubo un problema con la solicitud: ${response.status}`);
      }
      const data = await response.json();
      showComments(data);
      existingComments();
  } catch (error) {
      console.log(error);
  }
}

//Función que genera las cards con los producto comentarios.
function showComments(dataComments) {
  //Ordeno el array para mostrar los comentarios por fecha.
  dataComments.sort(function(a, b) {
    //Convierto las fechas a tipo "Date". (eran string).
    let dateA = new Date(a.dateTime);
    let dateB = new Date(b.dateTime);
    return dateA - dateB;
});

//Muestro los comentarios.
  for (const comment of dataComments) {
  containerComments.innerHTML += ` 
  <div class="media-body border border-2 px-3 py-2"> 
    <div class="d-flex align-items-center">
      <p class="mb-0"><strong> ${comment.user} </strong> - <small> ${comment.dateTime}</small> - ${showStars(comment.score)} </p>
    </div>
    <p class="mb-0"> ${comment.description} </p>
  </div>
  `
  }
}

//Función para mostrar los comentarios creados por el usuario incluso al reiniciar la página.
function existingComments(){
  for (const comment of comments) {
    if(productID == comment.productID){
      showComments([comment]);
    }
  }
}

//Función para agregar nuevos comentarios.
function addComment() {
  const comment = document.getElementById("comment");
  const commentText = comment.value.trim();
  const selectedRating = document.getElementById("options").value;
  let currentDate = new Date().toLocaleString();

  //Verifico que exista texto en el textarea.
  if (commentText) {
    const newComment = {
      user: JSON.parse(localStorage.getItem('datosUsuario')).username,
      score: selectedRating,
      description: commentText,
      dateTime: currentDate,
      productID: productID
    };
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
    comment.value = '';
    showComments([newComment]);
  }
}
btnSend.addEventListener("click", addComment);

//Función que genera las estrellas para los comentarios.
function showStars(quantity){
  let stars = "";

  for (let i = 0; i < quantity; i++) {
    stars += `<span class="fa fa-star checked"></span>`;
  }

  for (let i = quantity; i < 5; i++) {
    stars += `<span class="fa fa-star"></span>`;
  }
  return stars;
}

//Función asíncrona que muestra las cards de los productos relacionados, utilizando el endpoint de los productos.
async function getAndShowRelationProducts(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Hubo un problema con la solicitud: ${response.status}`);
      }
      const data = await response.json();
      showRelatedProducts(data.products);
  } catch (error) {
      console.log(error);
  }
}

//Función para pushear el id del producto al localStorage y redirigir a su respectiva página.
function setProductID(id) {      
  localStorage.setItem("productID", id);
  window.location = "product-info.html"
}

//Función productos relacionados
function showRelatedProducts(products){
  let contador = 0;
        for (let i = 0; i < products.length; i++) {
            if (productID != products[i].id && contador < 2){ 
            document.getElementById("containerRelatedProducts").innerHTML += `
            <div class="col-6 col-md-4 col-lg-3 cursor-active">
            <div class="card">
            <img src="${products[i].image}" class="card-img-top" alt="..." onclick="setProductID(${products[i].id})">
           <div class="card-body">
            <h6 class="card-title">${products[i].name}</h6>
              </div>
           </div>
           </div>` 
           contador++;
          }
      }
}

//Función que añade productos al carrito.
function addToCart(product) {
  if(productsInCart.some(item => item.id === product.id)){
    Toastify({
      text: "El producto ya está incluido en el carrito.",
      duration: 1500,
      style: {
        background: "#C82333"
      }
      }).showToast();
  } else {
    productsInCart.push(product);
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    Toastify({
      text: "El producto ha sido añadido al carrito!",
      duration: 2000,
      style: {
        background: "#218838"
      }
      }).showToast();
  }
}