const botonIngrediente = document.getElementById('boton-ingrediente');
const listadoRecetas = document.getElementById('listado-recetas');
const input = document.getElementById('ingrediente');

async function pedir() {
    const ingrediente = input.value;
    input.value = '';
    listadoRecetas.innerHTML = '';
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
        const infoPedido = await response.json();
        for (let i = 0; i < infoPedido.meals.length; i++) {
            const receta = infoPedido.meals[i];
            const mostrarPedido = document.createElement('div');
            const botonReceta = document.createElement('button');
            botonReceta.setAttribute('id', receta.idMeal);
            botonReceta.textContent = receta.strMeal;
            mostrarPedido.appendChild(botonReceta);
            mostrarPedido.style.margin="10px";
            mostrarPedido.style.textAlign="center";
            listadoRecetas.appendChild(mostrarPedido);
            botonReceta.addEventListener('click', funcionReceta);
        }

        

} catch (error) {
    console.log(error); "no se pudo pedir"

}}

async function funcionReceta (event) {
    try {
        const contenedor = document.getElementsByClassName('contenedor-receta');
        if (contenedor) {
            contenedor[0]?.remove();
        }
        const botonReceta = event.target.id;
        console.log(botonReceta);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${botonReceta}`);
        const recetaRespuesta = await response.json();
        const divReceta = document.createElement('div');
        divReceta.classList.add('contenedor-receta');
        divReceta.style.border = '1px solid black';
        event.target.parentElement.appendChild(divReceta);
        const tituloReceta = document.createElement('h2');
        divReceta.appendChild(tituloReceta);
        tituloReceta.textContent = recetaRespuesta.meals[0].strMeal;
        const instrucciones = document.createElement('p');
        instrucciones.textContent = recetaRespuesta.meals[0].strInstructions;
        console.log(recetaRespuesta.meals[0].strInstructions)
        divReceta.appendChild(instrucciones);
        const ingredientes = document.createElement('ul');
        divReceta.appendChild(ingredientes);
        for (let i = 1; i < 20; i++) {
            const ingrediente = document.createElement('li');
            ingrediente.style.listStyle = 'none';
            const ingredientesParaMostrar = recetaRespuesta.meals[0][`strIngredient${i}`] + ' ' + recetaRespuesta.meals[0][`strMeasure${i}`];
            if (ingredientesParaMostrar) {
                ingrediente.textContent = ingredientesParaMostrar;
                ingredientes.appendChild(ingrediente);
            }
            
        }


    }
    catch (error) {
        console.log(error);
    }
}


botonIngrediente.addEventListener('click', pedir);
