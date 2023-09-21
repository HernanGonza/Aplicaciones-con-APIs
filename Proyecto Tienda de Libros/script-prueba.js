let input_buscar = document.getElementById('input_buscar');
let boton_buscar_titulo = document.getElementById('boton_buscar_titulo');
let boton_buscar_autor = document.getElementById('boton_buscar_autor');
let listado_libros = document.getElementById('listado_libros');
let boton_anterior = document.getElementById('boton_anterior');
let boton_siguiente = document.getElementById('boton_siguiente');
let tablaCarrito = document.getElementById('tabla-carrito');
let linea_total = document.getElementById('linea_total');

async function buscarLibroTitulo() {
    try {
        const input = input_buscar.value.trim();
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${input}"&maxResults=10&langRestrict=es`);
        const infoLibro = await response.json();
        mostrarLibros(infoLibro);
    }
    catch (error) {
        console.log(error);
    }
}

async function buscarLibroAutor() {
    try {
        const input = input_buscar.value.trim();
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${input}"&maxResults=10&langRestrict=es`);
        const infoLibro = await response.json();
        mostrarLibros(infoLibro);
    }
    catch (error) {
        console.log(error);
    }
}

boton_buscar_titulo.addEventListener('click', buscarLibroTitulo);
boton_buscar_autor.addEventListener('click', buscarLibroAutor);

function agregarAlCarrito(event) {
    
    const card = event.target.parentElement;
    const botonCarrito = event.target;
    botonCarrito.disabled = true;
    let cantidad = 1;
    const libro = card.getElementsByClassName('card-title')[0].textContent;
    const precio = card.getElementsByClassName('card-precio')[0].textContent;
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${libro}</td>
        <td>${precio}</td>
        <td style="display: flex; flex-direction: row; justify-content: space-between;"><button id="menos" style="visibility:hidden;">-</button><p id="cantidadProducto">${cantidad}</p><button id="mas">+</button></td>
        <td class="subtotal">${precio}</td>
        <td><button type="button" class="btn btn-danger">Eliminar</button></td>
    `;
    nuevaFila.classList.add('table');
    nuevaFila.classList.add('table-hover');
    tablaCarrito.appendChild(nuevaFila);

    
    let subtotalCelda = nuevaFila.querySelector('td:nth-child(4)');

    mas.addEventListener('click', function () {
        cantidad = cantidad + 1;
        document.getElementById('cantidadProducto').textContent = cantidad;
        
        calcularSubtotal(cantidad)
    });

    function calcularSubtotal(cantidad) {
            let subtotal = precio * cantidad;
            subtotalCelda.textContent = Math.round(subtotal * 100) / 100;
    };


    const botonEliminar = nuevaFila.querySelector('.btn-danger');
    botonEliminar.addEventListener('click', function () {
        nuevaFila.remove();
        cantidad = 0;
        botonCarrito.disabled = false;
        
    });
}


function mostrarLibros(infoLibro) {
    listado_libros.innerHTML = '';
    input_buscar.value = '';

    for (let i = 0; i < infoLibro.items.length; i++) {
        const div_card = document.createElement('div');
        div_card.classList.add('card');
        div_card.style.width = '18rem';
        listado_libros.appendChild(div_card);


        if (infoLibro.items[i].volumeInfo.imageLinks) {
            const imagen_card = document.createElement('img');
            imagen_card.src = infoLibro.items[i].volumeInfo.imageLinks.thumbnail;
            imagen_card.classList.add('card-img-top');
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
            boton_agregar_carrito.classList.add('btn-primary');
            boton_agregar_carrito.classList.add('agregar-carrito');
            boton_agregar_carrito.textContent = 'Agregar al carrito';
            div_card.appendChild(boton_agregar_carrito);
            boton_agregar_carrito.addEventListener('click', agregarAlCarrito);
        }
    }
}




