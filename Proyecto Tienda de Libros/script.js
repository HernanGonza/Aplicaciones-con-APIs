let input_buscar = document.getElementById('input_buscar');
let boton_buscar_titulo = document.getElementById('boton_buscar_titulo');
let boton_buscar_autor = document.getElementById('boton_buscar_autor');
let listado_libros = document.getElementById('listado_libros');
let boton_anterior = document.getElementById('boton_anterior');
let boton_siguiente = document.getElementById('boton_siguiente');
let tablaCarrito = document.getElementById('tabla-carrito');
let linea_total = document.getElementById('linea_total');
let infoLibro;
let cantidadPaginas;
let cantidadLibros = 8
let pagina = 1

window.onload = buscarLibroRelevantes();
async function buscarLibroRelevantes() {
    try {
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=bestsellers&orderBy=newest&maxResults=40&langRestrict=es');
        infoLibro = await response.json();
        cantidadPaginas = Math.ceil(infoLibro.items.length / cantidadLibros)
        mostrarLibros(infoLibro);
    }
    catch (error) {
        console.log(error);
    }
}




//Funcion para buscar libros segun el titulo
async function buscarLibroTitulo() {
    try {
        const input = input_buscar.value.trim();
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${input}"&maxResults=40&langRestrict=es`);
        infoLibro = await response.json();
        cantidadPaginas = Math.ceil(infoLibro.items.length / cantidadLibros)
        mostrarLibros(infoLibro);
    }
    catch (error) {
        console.log(error);
    }
}

//Funcion para buscar libros segun el autor
async function buscarLibroAutor() {
    try {
        const input = input_buscar.value.trim();
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${input}"&maxResults=40&langRestrict=es`);
        infoLibro = await response.json();
        mostrarLibros(infoLibro);
        cantidadPaginas = Math.ceil(infoLibro.items.length / cantidadLibros)
    }
    catch (error) {
        console.log(error);
    }
}

boton_buscar_titulo.addEventListener('click', buscarLibroTitulo);
boton_buscar_autor.addEventListener('click', buscarLibroAutor);



//Funcion para agregar cada elemento en el carrito.
//Incluye la funcion interna para eliminar cada elemento del carrito
//Incluye la funcion interna para cambiar los subtotales dependiendo de la cantidad
//Incluye la funcion interna para calcular el total de todos los elementos
function agregarAlCarrito(event) {

    const card = event.target.parentElement;
    const botonCarrito = event.target;
    botonCarrito.disabled = true;
    const libro = card.getElementsByClassName('card-title')[0].textContent;
    const precio = card.getElementsByClassName('card-precio')[0].textContent;
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${libro}</td>
        <td>${precio}</td>
        <td><input type="number" min="1" max="100" value="1"></td>
        <td class="subtotal">${precio}</td>
        <td><button type="button" class="btn btn-danger">Eliminar</button></td>
    `;

    nuevaFila.classList.add('table');
    nuevaFila.classList.add('table-hover');
    tablaCarrito.appendChild(nuevaFila);


    const cantidadInput = nuevaFila.querySelector('input');
    const subtotalCelda = nuevaFila.querySelector('td:nth-child(4)');

    cantidadInput.addEventListener('input', function () {
        const cantidad = cantidadInput.value;

        const subtotal = precio * cantidad;
        subtotalCelda.textContent = Math.round(subtotal * 100) / 100;
        calcularTotal();
    });
    calcularTotal();


    function calcularTotal() {
        let sumaTotales = 0;
        let celdaTotal = document.getElementById('celda-total');
        let arregloSubtotales = [];
        


        const filas = document.getElementById('tabla-carrito').getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            const celda = filas[i].getElementsByTagName('td');
            const subtotal = parseFloat(celda[3].innerText);
            arregloSubtotales.push(subtotal);
        }
        for (let i = 0; i < arregloSubtotales.length; i++) {
            sumaTotales += arregloSubtotales[i];
            
        }
        
        celdaTotal.innerHTML = Math.round(sumaTotales * 100) / 100;
        celdaTotal.style.fontWeight = 'bolder';
        
    }

    const botonEliminar = nuevaFila.querySelector('.btn-danger');
    botonEliminar.addEventListener('click', function () {
        nuevaFila.remove();
        botonCarrito.disabled = false;
        calcularTotal();
    });
}

//Funcion para mostrar los libros en las tarjetas despues de la busqueda
function mostrarLibros(infoLibro) {
    listado_libros.innerHTML = '';
    input_buscar.value = '';

    let indice = (pagina - 1) * cantidadLibros
    let final = indice + cantidadLibros

    for (let i = indice; i < final && i < infoLibro.items.length; i++) {
        const div_card = document.createElement('div');
        div_card.classList.add('card');
        div_card.style.width = '18rem';
        listado_libros.appendChild(div_card);


        if (infoLibro.items[i].volumeInfo.imageLinks) {
            const imagen_card = document.createElement('img');
            imagen_card.src = infoLibro.items[i].volumeInfo.imageLinks.thumbnail;
            imagen_card.classList.add('card-img-top');
            imagen_card.style.height = '400px';
            div_card.appendChild(imagen_card);
        }else {
            const imagen_card = document.createElement('img');
            imagen_card.src = './img/noDisponible.jpeg';
            imagen_card.classList.add('card-img-top');
            imagen_card.style.height = '400px';
            div_card.appendChild(imagen_card);
        }


        const titulo_card = document.createElement('h5');
        titulo_card.classList.add('card-title');
        titulo_card.textContent = infoLibro.items[i].volumeInfo.title;
        div_card.appendChild(titulo_card);

        const autor_card = document.createElement('p');
        autor_card.classList.add('card-text');
        autor_card.textContent = 'Autor: ' + infoLibro.items[i].volumeInfo.authors;
        div_card.appendChild(autor_card);

        const publicacion = document.createElement('p');
        publicacion.classList.add('card-publicacion');
        publicacion.textContent = 'Publicacion: ' + infoLibro.items[i].volumeInfo.publishedDate;
        div_card.appendChild(publicacion);

        if (infoLibro.items[i].saleInfo.saleability == 'FOR_SALE') {
            const disponibilidad = document.createElement('p');
            disponibilidad.classList.add('card-disponibilidad');
            disponibilidad.textContent = 'Disponible';
            div_card.appendChild(disponibilidad);
            const precio = document.createElement('p');
            precio.classList.add('card-precio');
            precio.textContent = infoLibro.items[i].saleInfo.retailPrice.amount;
            div_card.appendChild(precio);
            const boton_agregar_carrito = document.createElement('button');
            boton_agregar_carrito.classList.add('btn');
            boton_agregar_carrito.classList.add('btn-dark');
            boton_agregar_carrito.classList.add('agregar-carrito');
            boton_agregar_carrito.textContent = 'Agregar al carrito';
            div_card.appendChild(boton_agregar_carrito);
            boton_agregar_carrito.addEventListener('click', agregarAlCarrito);
        } else {
            const boton_agregar_carrito = document.createElement('div');
            boton_agregar_carrito.classList.add('alert');
            boton_agregar_carrito.classList.add('alert-danger');
            boton_agregar_carrito.role = 'alert';
            boton_agregar_carrito.textContent = 'No disponible';
            div_card.appendChild(boton_agregar_carrito);
        }
    }
}
//eventos de botones de cambio de pagina
boton_anterior.addEventListener('click', () => {
    console.log("btn anterior");
    if (pagina > 1) {
        pagina--;
        mostrarLibros(infoLibro);
    }
});
boton_siguiente.addEventListener('click', () => {
    console.log("btn siguiente");
    if (pagina < cantidadPaginas) {
        pagina++;
        mostrarLibros(infoLibro);
    }
});



//JavaScript para modal
let botonConfirmar = document.getElementById('boton_confirmar');
let tituloMedioPago = document.getElementById('titulo_medio_pago');
let parrafoMedioPago = document.getElementById('parrafo_medio_pago');
let selectMedioPago = document.getElementById('select_medio_pago');
let precioModal = document.getElementById('precioModal');


function medioPago() {
    switch (selectMedioPago.value) {
        case 'Efectivo':
            tituloMedioPago.textContent = 'Efectivo';
            parrafoMedioPago.textContent = 'Pago en efectivo';
            
            break;
        case 'Tarjeta de credito':
            tituloMedioPago.textContent = 'Tarjeta de credito';
            parrafoMedioPago.textContent = 'Pago con tarjeta de credito';
            break;
        case 'Tarjeta de debito':
            tituloMedioPago.textContent = 'Tarjeta de debito';
            parrafoMedioPago.textContent = 'Pago con tarjeta de debito';
            break;
        case 'Transferencia':
            tituloMedioPago.textContent = 'Transferencia';
            parrafoMedioPago.textContent = 'Pago con transferencia';
            break;
        case 'Mercado Pago':
            tituloMedioPago.textContent = 'Mercado Pago';
            parrafoMedioPago.textContent = 'Pago con mercado pago';
            break;
    }
}





botonConfirmar.addEventListener('click', medioPago);
selectMedioPago.addEventListener('change', medioPago);





function procesarPago() {
    // Simular el proceso de pago utilizando la API de pruebas
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            compra: carrito,
            success: 200
        })// Envía el contenido del carrito como datos de pago 
    })
        .then(response => response.json())

        .then(data => {
            console.log(data);
            if (data.success == 200) {
                alert("¡Pago exitoso! Gracias por su compra.");
                carrito = []; // Vacía el carrito después de un pago exitoso
                actualizarCarrito(); // Actualiza la interfaz de usuario
            } else {
                alert("El pago no se pudo procesar. Intente nuevamente más tarde.");
            }
        })
        .catch(error => console.error("Error al procesar el pago: " + error));
}

//Funcion para que el boton de scroll-top aparezca
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('a.scroll-top').fadeIn('slow');
    } else {
        $('a.scroll-top').fadeOut('slow');
    }
});

//Funcion para que funcione el boton de scroll-top
$('a.scroll-top').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, 200);
});