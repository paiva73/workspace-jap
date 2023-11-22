const CART_INFO_UR = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const cartContainer = document.getElementById("containerArticles");
const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

//Event listener para mostrar los articulos y event listener de botones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  getAndShowCartArticles(CART_INFO_UR);
  premium.addEventListener('click', showDataCost);
  express.addEventListener('click', showDataCost);
  estandar.addEventListener('click', showDataCost);
})

//Fetch para traer el artículo que nos brindan del endpoint
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

//Función que muestra los artículo del cart
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
                      <a onclick="removeFromCart('${article.id}')" href="#!" class="text-muted"><i class="bi bi-trash btn btn-outline-danger" ></i></a>
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
      showDataCost()
    }
  }
}

//Variables donde almacenamos los elementos HTML a utilizar proximamente
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

//Función para calcular el subtotal
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

//Funcion para obtener el costo del envío.
function showDataCost() {
  subtotal.innerText = `USD ${funcSubtotal()}`
  shippingCost.innerText = `USD ${funcShippingCost()}`;
  total.innerText = `USD ${funcSubtotal() + funcShippingCost()}`;
}

//IIFE que valida el form y modal
(() => {
  'use strict'
  const modal = document.getElementById('payment');
  const form0 = document.getElementById('form0');
  const form1 = document.getElementById('visa');
  const form2 = document.getElementById('transferencia');
  const select1 = document.getElementById('visa-tab');
  const select2 = document.getElementById('transferencia-tab');

  modal.addEventListener('click', function(event){
    if (event.target === select1) {
      form1.removeAttribute('disabled');
      form2.setAttribute('disabled', true);
    
    } else if (event.target === select2) {
      form2.removeAttribute('disabled');
      form1.setAttribute('disabled', true);
      
    }
  });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');
  
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if((form1.checkValidity() || form2.checkValidity()) && form0.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        Swal.fire({
          icon: 'success',
          title: 'Su compra ha sido realizada con éxito!',
          showConfirmButton: false,
          timer: 1800
          });
      
          setTimeout(() => {location.reload()}, 2000);
      } else if(!form1.checkValidity() && !form2.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        Toastify({
          text: "Debes agregar método de pago",
          duration: 1500,
          position: 'center',
          style: {
            background: "#C82333"
          }
          }).showToast();
      } else {
        event.preventDefault();
        event.stopPropagation();
      }

      form0.classList.add('was-validated');
      form.classList.add('was-validated');
    }, false)
  })
  
})()

// Validación personalizada para el titular de tarjeta
$('#card-holder-name').on('input', function() {
  let cardHolderName = $(this).val();
  if (/^[A-Za-z\s]+$/.test(cardHolderName)) {
      $(this).removeClass('is-invalid').addClass('is-valid');
  } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
  }
});

// Validación personalizada para el número de tarjeta
$('#card-number').on('input', function() {
  let cardNumber = $(this).val();
  if (/^\d{16}$/.test(cardNumber)) {
      $(this).removeClass('is-invalid').addClass('is-valid');
  } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
  }
});

// Validación personalizada para la fecha de vencimiento
$('#expiration-date').on('input', function() {
  let expirationDate = $(this).val();
  if (/^\d{2}\/\d{2}$/.test(expirationDate)) {
      $(this).removeClass('is-invalid').addClass('is-valid');
  } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
  }
});

// Validación personalizada para el CVV
$('#cvv').on('input', function() {
  let cvv = $(this).val();
  if (/^\d{3}$/.test(cvv)) {
      $(this).removeClass('is-invalid').addClass('is-valid');
  } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
  }
});

// Añadir el carácter "/" automáticamente a la fecha de vencimiento
$('#expiration-date').on('input', function() {
  let value = $(this).val();
  if (value.length === 2 && value.indexOf('/') === -1) {
      $(this).val(value + '/');
  }
});

//validacion del banco
$('#formCardName').on('change', function() {
  let selectedOption = $(this).val();
  if (selectedOption !== "") {
    $(this).removeClass('is-invalid').addClass('is-valid');
  } else {
    $(this).removeClass('is-valid').addClass('is-invalid');
  }
});

// Validacion del numero de cuenta
$('#account-number').on('input', function() {
  let accountNumber = $(this).val();
  if (/^\d{12}$/.test(accountNumber)) {
      $(this).removeClass('is-invalid').addClass('is-valid');
  } else {
      $(this).removeClass('is-valid').addClass('is-invalid');
  }
});
