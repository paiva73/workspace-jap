const CART_INFO_UR = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const cartContainer = document.getElementById("containerArticles");
const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

document.addEventListener("DOMContentLoaded", () => {
  getAndShowCartArticles(CART_INFO_UR);
})

async function getAndShowCartArticles(url){
  try { 
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Hubo un problema con la solicitud: ${response.status}`);
      }
      const data = await response.json();
      showCartArticles(data.articles);
      showCartArticles(productsInCart);
  } catch (error) {
    console.log(error);
  }
}
function showCartArticles(articles) {
  for (const article of articles) {
    cartContainer.innerHTML += `
                    <div id="${article.id}" class="row mb-4 d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src="${article.image || article.images[0]}"
                          class="img-fluid rounded-3" alt="Cotton T-shirt">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="mb-0">${article.name}</h6>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                          onclick="funDown('${encodeURIComponent(JSON.stringify(article))}')">
                          <i class="fas fa-minus"></i>
                        </button>

                        <input id="form${article.id}" min="1" name="quantity" value="1" type="number"
                          class="form-control form-control-sm" />
  
                        <button class="btn btn-link px-2"Item
                          onclick="funUp('${encodeURIComponent(JSON.stringify(article))}')">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
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


const enviarButton = document.querySelector('button[type="submit"]');
enviarButton.addEventListener('click', function (event) {
  const camposRequeridos = document.querySelectorAll('input[required]');
  let formIsValid = true;

  camposRequeridos.forEach((campo) => {
    if (!campo.value.trim()) {
      formIsValid = false;
      campo.classList.add('is-invalid');
    } else {
      campo.classList.remove('is-invalid');
    }
  });

  if (!formIsValid) {
    event.preventDefault(); // Evita que se envíe el formulario si hay campos vacíos.
  }
});

/*
document.addEventListener("DOMContentLoaded", function() {
  var checkboxValidationTool = document.getElementById("validationTooltip04");
  var textoExplicativo = document.getElementById("textoExplicativo");

  checkboxValidationTool.addEventListener("change", function() {
      var botonTerminos = document.querySelector('.btn-link');

      if (checkboxValidationTool.checked) {
          botonTerminos.classList.remove("text-danger");
          textoExplicativo.style.display = "none";
      } else {
          botonTerminos.classList.add("text-danger"); 
          textoExplicativo.style.display = "inline";
      }
  });
});
*/

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()