const productID = localStorage.getItem("productID");
const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const API_URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
const containerProduct = document.getElementById("containerProductInfo");
const containerComments = document.getElementById("containerComments");


document.addEventListener("DOMContentLoaded", () => {
    obtainAndShowProductsInfo(API_URL)
})
// Hacer la solicitud fetch a la API
async function obtainAndShowProductsInfo(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showProduct(data);
    } catch (error) {
        console.log("error", error);
    }
}

function showProduct(product){
containerProduct.innerHTML = ` 
<div class="row mb-2">
  <h1 class="border-bottom border-2 pt-5 pb-5 h2">${product.name}</h1>
</div>
<div class="row">
  <div class="mb-4">
    <h6 class="mb-0" class="mb-0"><b>Precio</b></h6>
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
  <div class="mb-4">
    <h6 class="mb-2"><b>Imágenes ilustrativas</b></h6>
    <div class="row mb-3">${showImages(product.images)}</div>
  </div>
</div>
    `
}

function showImages(images) {
    let img = "";

    for (const image of images) {
      img += `<div class="col-12 col-md-6 col-lg-3 mb-3"><img src="${image}" class="img-thumbnail img-fluid"></div>`
    }
    return img;
}


function showComments(comments) {
  let currentDate = new Date().toLocaleString();

  for (const comment of comments) {
  containerComments.innerHTML += ` 
  <div>
    <div>
      <p><strong> ${comment.user} </strong> - <small> ${currentDate}</small> - ${showStars(comment.score)} </p>
    </div>
    <p> ${comment.description} </p>
  </div>
  `
  }
}

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