
const CART_INFO_UR = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const cartContainer = document.getElementById("containerArticles");


document.addEventListener("DOMContentLoaded", () => {
  getAndShowCartArticles(CART_INFO_UR);
})

async function getAndShowCartArticles(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Hubo un problema con la solicitud: ${response.status}`);
    }
    const data = await response.json();
    showCartArticles(data.articles);

  } catch (error) {
    console.log(error);
  }
}
function showCartArticles(articles) {
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
                        <button class="btn btn-link px-2" id = "btnMen"
                          onclick="funDown(${article.unitCost})">
                          <i class="fas fa-minus"></i>
                        </button>

                        <input id="form1" min="0" name="quantity" value="1" type="number"
                          class="form-control form-control-sm" />
  
                        <button class="btn btn-link px-2" id = "btnMas"Item
                          onclick="funUp(${article.unitCost})">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">${article.currency} <span id="unity">${article.unitCost}</span></h6>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                      </div>
                    </div>
  `

  }
}


//Funcion para aumentar el "value" del form1
function funUp(item) {
  let form1 = document.getElementById("form1");
  const unity = document.getElementById("unity");
  unity.innerHTML = `
  ${(parseFloat(form1.value)+1) * item}
 `
 form1.stepUp();
}



//Funcion  para disiminuir el value del form1 y validar que el resultado no sea negativo
function funDown(item) {
  let form1 = document.getElementById("form1");
  const unity = document.getElementById("unity");
  let result = parseFloat(form1.value)-1;
  if(result<0){
    result = 0;
  }
  unity.innerHTML = `
  ${result * item}
 `
 form1.stepDown();
}


  

