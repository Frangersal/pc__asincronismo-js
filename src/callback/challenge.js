// Importa el módulo 'xmlhttprequest' para hacer solicitudes HTTP en Node.js
const { XMLHttpRequest } = require('xmlhttprequest');
const API = 'https://api.escuelajs.co/api/v1'; // URL base de la API

// Función para hacer una solicitud HTTP y manejar la respuesta con un callback
function fetchData(urlAPI, callback) {
    let xhttp = new XMLHttpRequest(); // Crea una instancia de XMLHttpRequest

    xhttp.open('GET', urlAPI, true); // Configura la solicitud GET a la URL proporcionada

    // Maneja los cambios de estado de la solicitud
    xhttp.onreadystatechange = function (event) {
        if(xhttp.readyState === 4) { // Verifica si la solicitud se completó
            if(xhttp.status === 200) { // Verifica si la respuesta fue exitosa
                callback(null, JSON.parse(xhttp.responseText)); // Retorna los datos convertidos a JSON
            } else {
                const error = new Error('Error ' + urlAPI); // Crea un error con la URL
                return callback(error, null); // Retorna el error y null como datos
            }
        }
    }

    xhttp.send(); // Envía la solicitud
}


// Realiza una solicitud para obtener todos los productos
fetchData(`${API}/products`, function(error1, data1) {
    if (error1) return console.error(error1); // Maneja el error si ocurre

    // Solicita los detalles del primer producto utilizando su ID
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2) {
        if (error2) return console.error(error2); // Maneja el error si ocurre

        // Solicita la información de la categoría del producto
        fetchData(`${API}/categories/${data2.category.id}`, function(error3, data3) {
            if (error3) return console.error(error3); // Maneja el error si ocurre

            // Muestra en consola el primer producto, su título y el nombre de la categoría
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
        });
    });
});
