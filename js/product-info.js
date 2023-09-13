const productID = localStorage.getItem("productID");
const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
const containerProduct = document.getElementById("containerProductInfo");

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
