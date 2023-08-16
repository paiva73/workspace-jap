const API_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const containerProducts = document.getElementById("containerProducts");

fetch (API_URL)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        for (const product of data.products) {
            containerProducts.innerHTML += `
            <div>
                <div>
                    <img src="${product.image}"/>
                </div>
                <div>
                    <h3>${product.name} - ${product.currency} ${product.cost}</h3>
                    <p>${product.description}</p>
                </div>
                <div>
                    <small>${product.soldCount} vendidos </small>
                </div>
            </div>
            `
            
        }
    })
    .catch(error =>{
        console.log("Error", error);
    })