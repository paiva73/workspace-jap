const CART_INFO_UR = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const cartContainer = document.getElementById("containerArticles");
const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

document.addEventListener("DOMContentLoaded", () => {
  getAndShowCartArticles(CART_INFO_UR);
  premium.addEventListener('click', showDataCost);
  express.addEventListener('click', showDataCost);
  estandar.addEventListener('click', showDataCost);
})

async function getAndShowCartArticles(url){
  try { 
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Hubo un problema con la solicitud: ${response.status}`);
      }
      const data = await response.json();
      let dataExist = productsInCart.some(function(product) {
        return product.id == data.articles[0].id;
      });
      if(!dataExist){
        productsInCart.unshift(data.articles[0]);
        console.log(productsInCart);
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
      }
      showCartArticles(productsInCart);
      showDataCost() ;
  } catch (error) {
    console.log(error);
  }
}
function showCartArticles(articles) {
  for (const article of articles) {
    cartContainer.innerHTML += `
                    <div id="${article.id}" class="row mb-4 d-flex justify-content-between align-items-center">
                      <div class="mb-2 col-12 col-md-2 col-lg-2 col-xl-2">
                        <img
                          src="${article.image || article.images[0]}"
                          class="img-fluid rounded-3" alt="Cotton T-shirt">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="mb-0 d-none d-md-block">${article.name}</h6>
                        <h6 class="mb-3 mt-2 text-center d-md-none d-block fw-bold">${article.name}</h6>
                      </div>
                      <div class="col-6 col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                          onclick="funDown('${encodeURIComponent(JSON.stringify(article))}')">
                          <i class="fas fa-minus"></i>
                        </button>

                        <input id="form${article.id}" min="1" name="quantity" value="1" type="number"
                          class="form-control form-control-sm" disabled/>
  
                        <button class="btn btn-link px-2"Item
                          onclick="funUp('${encodeURIComponent(JSON.stringify(article))}')">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-6 col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">${article.currency} <span id="unity${article.id}">${article.unitCost || article.cost}</span></h6>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a onclick="removeFromCart('${article.id}')" href="#!" class="text-muted"><i class="fas fa-times" ></i></a>
                      </div>
                    </div>
  `
  }
}
//Funcion para aumentar el "value" del form1
function funUp(item) {
  let product = JSON.parse(decodeURIComponent(item));
  let form1 = document.getElementById(`form${product.id}`);
  const unity = document.getElementById(`unity${product.id}`);
  unity.innerHTML = `
  ${(parseFloat(form1.value)+1) * (product.cost || product.unitCost)}
 `
 
 form1.stepUp();
 showDataCost();
}
//Funcion  para disiminuir el value del form1 y validar que el resultado no sea negativo
function funDown(item) {
  let product = JSON.parse(decodeURIComponent(item));
  let form1 = document.getElementById(`form${product.id}`);
  const unity = document.getElementById(`unity${product.id}`);
  let result = parseFloat(form1.value)-1;
  if(result<1){
    result = 1;
  }
  unity.innerHTML = `
  ${result * (product.cost || product.unitCost)}
 `
 form1.stepDown();
 showDataCost();
}
//Función que borra un producto del carrito.
function removeFromCart(articleId) {
  const articleElement = document.getElementById(articleId);
  articleElement.remove();
  //Borramos el producto del local storage.
  for (const product of productsInCart) {
    if(product.id == articleId){
      let indice = productsInCart.indexOf(product);
      productsInCart.splice(indice, 1);
      localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    }
  }
}
const subtotal = document.getElementById('subtotal');
const shippingCost = document.getElementById('costoEnvio');
const total = document.getElementById('total');

const premium = document.getElementById('premium');
const express = document.getElementById('express');
const estandar = document.getElementById('estandar');
//Función para pasar de UYU a USD. 
function converterToUSD(product) {
  let costInUSD = product.cost || product.unitCost ;
  if(product.currency == "UYU" ) {
    costInUSD = product.cost / 39 || product.unitCost / 39;
  }
  return costInUSD;
}
//Función para obtener el subtotal de precios de productos.
function funcSubtotal() {
  let subtotal = 0;
  productsInCart.forEach(product => {
    const quantity = parseInt(document.getElementById(`form${product.id}`).value);
    const costProduct = converterToUSD(product);
    subtotal += costProduct * quantity;
  });
  return parseInt(subtotal);
}
//Funcion para obtener el costo del envío.
function funcShippingCost() {
  let costEnvio;
  if (premium.checked) {
    costEnvio = funcSubtotal() * 0.15;
  } else if(express.checked){
    costEnvio = funcSubtotal() * .07;
  } else if(estandar.checked){
    costEnvio = funcSubtotal() * .05;    
  }
  return parseInt(costEnvio);
}
//Función para mostrar por pantalla la info.
function showDataCost() {
  subtotal.innerText = `USD ${funcSubtotal()}`
  shippingCost.innerText = `USD ${funcShippingCost()}`;
  total.innerText = `USD ${funcSubtotal() + funcShippingCost()}`;
}