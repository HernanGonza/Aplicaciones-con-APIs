const ingredienteInput = document.getElementById('ingrediente-input');
const buscarButton = document.getElementById('buscar-button');
const contenedorRecetas = document.querySelector('.recetas-grid'); // Cambiado a '.recetas-grid'

buscarButton.addEventListener('click', () => {
    const ingrediente = ingredienteInput.value.trim();
    if (ingrediente !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
            .then(response => response.json())
            .then(data => {
                contenedorRecetas.innerHTML = '';
                if (data.meals) {
                    data.meals.forEach(meal => {
                        obtenerDetallesReceta(meal.idMeal);
                    });
                } else {
                    contenedorRecetas.innerHTML = '<p>No se encontraron recetas con este ingrediente.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

function obtenerDetallesReceta(idReceta) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`)
        .then(response => response.json())
        .then(data => {
            const receta = data.meals[0];
            mostrarReceta(receta);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarReceta(receta) {
    const recetaDiv = document.createElement('div');
    recetaDiv.classList.add('receta');
    recetaDiv.innerHTML = `
        <h2>${receta.strMeal}</h2>
        <p><strong>Ingredientes:</strong> ${obtenerIngredientes(receta)}</p>
        <p><strong>Instrucciones:</strong> ${receta.strInstructions}</p>
        <img src="${receta.strMealThumb}">
    `;
    contenedorRecetas.appendChild(recetaDiv);
}

function obtenerIngredientes(receta) {
    let ingredientes = [];
    for (let i = 1; i <= 20; i++) {
        const ingrediente = receta[`strIngredient${i}`];
        const medida = receta[`strMeasure${i}`];
        if (ingrediente && medida) {
            ingredientes.push(`${medida} ${ingrediente}`);
        }
    }
    return ingredientes.join(', ');
}
