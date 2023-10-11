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
/*function showCartArticles(articles){
  for (const article of articles) {
    cartContainer.innerHTML += `
    <div class="row mb-4 d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src="${article.image}"
                          class="img-fluid rounded-3" alt="Cotton T-shirt">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="mb-0">${article.name}</h6>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                          <i class="fas fa-minus"></i>
                        </button>
  
                        <input id="form1" min="0" name="quantity" value="1" type="number"
                          class="form-control form-control-sm" />
  
                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">${article.currency} ${article.unitCost}</h6>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a onclick="cleanCart()" href="#!" class="text-muted"><i class="fas fa-times" ></i></a>
                      </div>
                    </div>
  `
  }
}

function cleanCart(){
  cartContainer.innerHTML = ` `
}
*/
/*function removeFromCart(cart, articleToRemove) {
  // Use the filter method to create a new cart without the article to remove
  const updatedCart = cart.filter(article => article !== articleToRemove);
  return updatedCart;
}
*/
function showCartArticles(articles) {
  for (const article of articles) {
    cartContainer.innerHTML += `
      <div id="${article.id}" class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img
            src="${article.image || article.images[0]}"
            class="img-fluid rounded-3" alt="">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6 class="mb-0">${article.name}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button class="btn btn-link px-2"
            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
            <i class="fas fa-minus"></i>
          </button>

          <input id="form1" min="0" name="quantity" value="1" type="number"
            class="form-control form-control-sm" />

          <button class="btn btn-link px-2"
            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 class="mb-0">${article.currency} ${article.unitCost || article.cost}</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <a onclick="removeFromCart('${article.id}')" href="#!" class="text-muted"><i class="fas fa-times" ></i></a>
        </div>
      </div>
    `;
  }
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