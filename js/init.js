const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que verifica si existe un usuario registrado.
const dataExists = JSON.parse(localStorage.getItem('datosUsuario'));
function verifyExistence(){
  if (!dataExists) {
      window.location.href = "login.html"
  }
}

verifyExistence();

//Función que genera el dropdown del usuario.
function createDropDown(){
  const navbarUserElement = document.getElementById('navbarUser');
  if (dataExists) {
      navbarUserElement.innerHTML = `
    <div class="dropdown">
      <button class="nav-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        ${dataExists.username}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="./cart.html">Mi carrito</a></li>
        <li><a class="dropdown-item" href="./my-profile.html">Mi perfil</a></li>
        <li><a onclick="signOff()" class="dropdown-item" href="./login.html">Cerrar sesión</a></li>
      </ul>
    </div>`;
  }
}

//Función asociada al botón "Cerrar sesión". Borra el usuario del local storage.
function signOff() {
  localStorage.removeItem('datosUsuario');
}

//Escucha del evento DOMContentLoaded para traer la configuración de color guardada en local storage.
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      let bodyElement = document.querySelector('body');
      bodyElement.setAttribute('data-bs-theme', savedTheme);
      changeButtonsColor(savedTheme);
      changeNavbarColor(savedTheme);
      changeIcon(savedTheme);
      changeModalColor(savedTheme);
      changeimgColor(savedTheme);
    }
    document.getElementById("icon").addEventListener("click", changeMode);
  createDropDown();
});

//Dark mode
const bgLight = document.querySelectorAll('.btn');
const navLight = document.querySelector('.navbar');
const frmLabel = document.querySelectorAll('.form-label');
const frmModal = document.querySelectorAll('.form-outline');
const img1 = document.getElementById("tarjetaImage");
const img2 = document.getElementById("transfImage");

//Función que cambia estilos del navbar.
function changeNavbarColor(theme) {
  if(theme == 'dark'){
    navLight.classList.remove('bg-dark');
    navLight.classList.add('bg-bootrstrap');
  } else {
    navLight.classList.add('bg-dark');
    navLight.classList.remove('bg-bootrstrap');
  }
}

//Función que cambia estilos de los botones.
function changeButtonsColor(theme){
  if(theme == 'dark'){
    for (const iterator of bgLight) {
      iterator.classList.add('btn-dark');
      iterator.classList.remove('btn-light');
    }
  } else {
    for (const iterator of bgLight) {
      iterator.classList.remove('btn-dark');
      iterator.classList.add('btn-light');
    }
  }
}

//Función que cambia estilos de los form-label.
function changeLabelColor(theme){
  if(theme == 'dark'){
    for (const iterator of frmLabel) {
      iterator.classList.add('form-label-dark');
      iterator.classList.remove('form-label-light');
    }
  } else {
    for (const iterator of frmLabel) {
      iterator.classList.remove('form-label-dark');
      iterator.classList.add('form-label-light');
    }
  }
}

//Función que cambia estilos de los label del payment modal.
function changeModalColor(theme){
  if(theme != 'dark'){
    for (const iterator of frmModal) {
      iterator.classList.add('form-white');
      iterator.classList.remove('form-white');
    }
  } else { 
    for (const iterator of frmModal) {
      iterator.classList.remove('form-white');
      iterator.classList.add('form-white');
    }
  }
}

//Función que cambia estilos de las imagenes del payment modal.
function changeimgColor(theme){
  if (img1 !== null){
    if(theme == 'dark'){
        img1.classList.add('invert-dark');
        img2.classList.add('invert-dark');
      } else { 
        img1.classList.remove('invert-dark');
        img2.classList.remove('invert-dark');
    }
  }
}

//Función que cambia el ícono.
function changeIcon(theme) {
  let iconModo = document.getElementById('icon');
  if(theme == 'dark'){
    iconModo.classList.add("bi-sun-fill");
    iconModo.classList.remove("bi-moon-fill");
  } else {
    iconModo.classList.remove("bi-sun-fill");
    iconModo.classList.add("bi-moon-fill");
  }
}

//Función asociada al ícono "sol/luna". Cambia de modo(oscuro/claro).
function changeMode() {
  let bodyElement = document.querySelector('body');
  let newTheme = bodyElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';

  bodyElement.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  changeButtonsColor(newTheme);
  changeNavbarColor(newTheme);
  changeIcon(newTheme);
  changeModalColor(newTheme);
  changeimgColor(newTheme);
}

