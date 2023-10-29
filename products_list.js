// product_list.js
document.addEventListener("DOMContentLoaded", function() {
    // Realizar una solicitud GET a la API para obtener los datos
    fetch("http://206.189.200.204:8080/api/v1/medicine")
        .then(response => response.json())
        .then(data => {
            // Luego de obtener los datos, recorre la lista de productos y crea tarjetas para cada uno
            const cardsContainer = document.querySelector(".cards_container");
            
            data.forEach(product => {
                const productCard = document.createElement("div");
                productCard.className = "product_card";
                productCard.innerHTML = `
                    <a href="product_details.html?id=${product.id}" class="product_card">
                    <img src="${product.imagePath}" alt="${product.name}">
                    <div class="product_info">
                        <div>
                            <p>Q${product.price.toFixed(2)}</p>
                            <p>${product.name}</p>
                        </div>
                        <figure>
                            <img src="./icons/bt_add_to_cart.svg" alt="">
                        </figure>
                    </div>
                `;
                cardsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos: ", error);
        });
});
