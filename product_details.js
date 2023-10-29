document.addEventListener("DOMContentLoaded", function() {
    // Recupera el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    document.getElementById("productForm").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";

    if (productId) {
        // Realiza una solicitud GET a la API para obtener los detalles del producto por ID
        fetch(`http://206.189.200.204:8080/api/v1/medicine/${productId}`)
            .then(response => response.json())
            .then(product => {
                // Actualiza los elementos HTML con los detalles del producto
                document.getElementById("productImage").src = product.imagePath;
                document.getElementById("productName").textContent = product.name;
                document.getElementById("productCode").textContent = product.code;
                document.getElementById("productDescription").textContent = product.description;
                document.getElementById("productPrice").textContent = `Q${product.price.toFixed(2)}`;
                document.getElementById("productQuantity").textContent = `${product.quantity} unidades`;
                document.getElementById("branchId").textContent = product.branchId;


                // Después de cargar los detalles del producto, habilita el botón de "Editar"
                document.getElementById("editButton").removeAttribute("disabled");
            })
            .catch(error => {
                console.error("Error al cargar los detalles del producto: ", error);
            });
    }
});

function mostrarTabla() {
    document.getElementById("productForm").style.display = "none";
    document.getElementById("productImage").style.display = "inline";
    document.getElementById("editButton").style.display = "inline";
    document.getElementById("saveButton").style.display = "none";
    document.getElementById("productTable").style.display = "table";
    document.getElementById("cancelButton").style.display = "none";
    document.getElementById("deleteProduct").style.display = "inline";
}

function mostrarFormulario() {
    document.getElementById("productForm").style.display = "block";
    document.getElementById("productImage").style.display = "none";
    document.getElementById("editButton").style.display = "none";
    document.getElementById("saveButton").style.display = "inline";
    document.getElementById("productTable").style.display = "none";
    document.getElementById("cancelButton").style.display = "inline";
    document.getElementById("deleteProduct").style.display = "none";
}

function guardarCambios() {
    // Aquí puedes implementar la lógica para guardar los cambios y luego mostrar la tabla nuevamente.
    // Por ejemplo, puedes enviar una solicitud al servidor para actualizar los datos.
    // Recupera el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
        // Recuperar los valores del formulario
        const productName = document.getElementById("productName").value;
        const productCode = document.getElementById("productCode").value;
        const productDescription = document.getElementById("productDescription").value;
        const productPrice = document.getElementById("productPrice").value;
        const productQuantity = document.getElementById("productQuantity").value;
        const branchId = document.getElementById("branchId").value;

        // Crear un objeto con los valores del formulario
        const productData = {
            productName: productName,
            productCode: productCode,
            productDescription: productDescription,
            productPrice: productPrice,
            productQuantity: productQuantity,
            branchId: branchId
        };
        fetch(`http://206.189.200.204:8080/api/v1/medicine/update/${productId}`)
            .then(response => response.json())
            .then(product => {

            }).catch(error => {
                console.error("Error al actualizar los detalles del producto: ", error);
            });
        console.log(productData);



    }
    
    // Después de guardar los cambios, muestra la tabla y oculta el formulario.
    mostrarTabla();
}
