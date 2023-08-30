const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const containerProducts = document.getElementById("containerProducts");

fetch (API_URL)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        for (const product of data.products) {
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
            `
        }
    })
    .catch(error =>{
        console.log("Error", error);
    })

// A partir de acá creo funcionalidad de ordenar por precio (Revisar todo a partir de aca)



