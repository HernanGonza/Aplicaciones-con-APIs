let input_buscar = document.getElementById('input_buscar');
let boton_buscar_titulo = document.getElementById('boton_buscar_titulo');
let boton_buscar_autor = document.getElementById('boton_buscar_autor');
let listado_libros = document.getElementById('listado_libros');
let boton_anterior = document.getElementById('boton_anterior');
let boton_siguiente = document.getElementById('boton_siguiente');


async function buscarLibroTitulo() {
    try {
        const input = input_buscar.value.trim();
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${input}"&maxResults=40`);
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
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${input}"`);
        const infoLibro = await response.json();
        mostrarLibros(infoLibro);
    }
    catch (error) {
        console.log(error);
    }
}

boton_buscar_titulo.addEventListener('click', buscarLibroTitulo);
boton_buscar_autor.addEventListener('click', buscarLibroAutor);



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
        precio.textContent = 'Precio: $' + infoLibro.items[i].saleInfo.retailPrice.amount;
        div_card.appendChild(precio);
        const boton_agregar_carrito = document.createElement('button');
        boton_agregar_carrito.classList.add('btn');
        boton_agregar_carrito.classList.add('btn-primary');
        boton_agregar_carrito.id = infoLibro.items[i].id;
        boton_agregar_carrito.textContent = 'Agregar al carrito';
        div_card.appendChild(boton_agregar_carrito);
    } else {
        const no_disponible = document.createElement('p');
        no_disponible.classList.add('card-disponibilidad');
        no_disponible.textContent = 'No disponible';
        div_card.appendChild(no_disponible);
    }

    

}}





