const input_ciudad = document.getElementById('ciudad');
const boton = document.getElementById('boton');
const clima_actual = document.getElementById('clima_actual');
let video = document.getElementById('video');

async function buscarCiudad() {

    clima_actual.style.backgroundColor = '';
    clima_actual.style.borderStyle = '';
    video.src = '';
    clima_actual.innerHTML = '';
    clima_actual.style.display = 'none';
    if (input_ciudad.value) {
        clima_actual.style.display = 'block';
        try {
            const ciudad = input_ciudad.value.trim();
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6ee8d07c5b04493fb74113918230409&q=${ciudad}`);
            const infoClima = await response.json();

            const lista_cinco_dias = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6ee8d07c5b04493fb74113918230409&q=${ciudad}&days=5`);
            const infoClima5dias = await lista_cinco_dias.json();

            const nombreCiudad = document.createElement('h2');
            nombreCiudad.textContent = 'Clima actual en ' + infoClima.location.name + ", " + infoClima.location.region + ", " + infoClima.location.country;
            clima_actual.appendChild(nombreCiudad);
            const salto1 = document.createElement('br');
            clima_actual.appendChild(salto1);
            const titulo_tempratura_actual = document.createElement('h3');
            titulo_tempratura_actual.textContent = 'Temperatura actual';
            clima_actual.appendChild(titulo_tempratura_actual);
            const temperatura_actual = document.createElement('p');
            temperatura_actual.textContent = infoClima.current.temp_c + '°C';
            clima_actual.appendChild(temperatura_actual);
            const salto2 = document.createElement('br');
            clima_actual.appendChild(salto2);
            const div_actual = document.createElement('div');
            div_actual.classList.add('actual');
            clima_actual.appendChild(div_actual);
            const titulo_condiciones_actuales = document.createElement('h1');
            titulo_condiciones_actuales.textContent = 'Condiciones actuales';
            div_actual.appendChild(titulo_condiciones_actuales);
            const condicion_actual = document.createElement('p');
            condicion_actual.textContent = infoClima.current.condition.text;
            titulo_condiciones_actuales.appendChild(condicion_actual);
            const condicion_actual_icono = document.createElement('img');
            condicion_actual_icono.src = infoClima.current.condition.icon;
            condicion_actual_icono.style.width = '200px';
            condicion_actual_icono.style.height = '200px';
            condicion_actual_icono.style.marginBottom = '70px';
            titulo_condiciones_actuales.appendChild(condicion_actual_icono);
            const salto3 = document.createElement('br');
            clima_actual.appendChild(salto3);
            const sensacion_termica_titulo = document.createElement('h3');
            sensacion_termica_titulo.textContent = 'Sensacion termica';
            div_actual.appendChild(sensacion_termica_titulo);
            const sensacion_termica = document.createElement('p');
            sensacion_termica.textContent = infoClima.current.feelslike_c + '°C';
            sensacion_termica_titulo.appendChild(sensacion_termica);
            
            const div_viento = document.createElement('div');
            div_viento.classList.add('viento');
            clima_actual.appendChild(div_viento);
            const direccion_viento_titulo = document.createElement('h3');
            direccion_viento_titulo.textContent = 'Direccion del viento';
            div_viento.appendChild(direccion_viento_titulo);
            const direccion_viento = document.createElement('p');
            direccion_viento.textContent = infoClima.current.wind_dir;
            direccion_viento_titulo.appendChild(direccion_viento);
            const velocidad_viento_titulo = document.createElement('h3');
            velocidad_viento_titulo.textContent = 'Velocidad del viento';
            div_viento.appendChild(velocidad_viento_titulo);
            const velocidad_viento = document.createElement('p');
            velocidad_viento.textContent = infoClima.current.wind_kph + ' km/h';
            velocidad_viento_titulo.appendChild(velocidad_viento);
            const salto5 = document.createElement('br');
            clima_actual.appendChild(salto5);
            const humedad_actual_titulo = document.createElement('h3');
            humedad_actual_titulo.textContent = 'Humedad actual';
            div_viento.appendChild(humedad_actual_titulo);
            const humedad_actual = document.createElement('p');
            humedad_actual.textContent = infoClima.current.humidity + ' %';
            humedad_actual_titulo.appendChild(humedad_actual);
            const salto6 = document.createElement('br');
            clima_actual.appendChild(salto6);
            const mapa = document.createElement('iframe');
            mapa.classList.add('mapa');
            mapa.src = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d774237.2162586577!2d${infoClima.location.lon}!3d${infoClima.location.lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1694564774025!5m2!1ses-419!2sar" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade`;
            clima_actual.appendChild(mapa);

            const div_forecast = document.createElement('div');
            div_forecast.classList.add('forecast');
            clima_actual.appendChild(div_forecast);

            const div_dia = []; // Array para almacenar los divs

            for (let i = 0; i < infoClima5dias.forecast.forecastday.length; i++) {
                div_dia[i] = document.createElement('div'); // Crear un div para cada índice
                const dia = infoClima5dias.forecast.forecastday[i];
                const elemento = document.createElement('p');
                elemento.textContent = 'Fecha: ' + dia.date;
                const tempMaxima = document.createElement('p');
                tempMaxima.textContent = 'Temperatura Maxima: ' + dia.day.maxtemp_c;
                const tempMinima = document.createElement('p');
                tempMinima.textContent = 'Temperatura Minima: ' + dia.day.mintemp_c;
                const icono = document.createElement('img');
                icono.src = dia.day.condition.icon;
                const condicion = document.createElement('p');
                condicion.textContent = 'Condicion: ' + dia.day.condition.text;
                div_dia[i].appendChild(elemento);
                div_dia[i].appendChild(tempMaxima);
                div_dia[i].appendChild(tempMinima);
                div_dia[i].appendChild(icono);
                div_dia[i].appendChild(condicion);
                div_forecast.appendChild(div_dia[i]);
            }


            switch (infoClima.current.condition.text) {
                case 'Sunny':
                    video.src = 'videos/sunny.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Soleado';
                    break;
                case 'Clear':
                    video.src = 'videos/clear.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Cielo despejado';
                    break;
                case 'Partly cloudy':
                    video.src = 'videos/partly_cloudy.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Parcialmente Nublado';
                    break;
                case 'Cloudy':
                    video.src = 'videos/cloudy.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nublado';
                    break;
                case 'Overcast':
                    video.src = 'videos/overcast.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Cielo cubierto';
                    break;
                case 'Mist':
                    video.src = 'videos/niebla.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Niebla';
                    break;
                case 'Patchy rain possible':
                    video.src = 'videos/llovizna.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Posible lluvia dispersa';
                    break;
                case 'Patchy snow possible':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Posible nieve dispersa';
                    break;
                case 'Patchy sleet possible':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Posible aguanieve dispersa';
                    break;
                case 'Patchy freezing drizzle possible':
                    video.src = 'videos/llovizna.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Posible llovizna helada dispersa';
                    break;
                case 'Thundery outbreaks possible':
                    video.src = 'videos/thunder.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Posibles tormentas';
                    break;
                case 'Blowing snow':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Ventisca de nieve';
                    break;
                case 'Blizzard':
                    video.src = 'videos/blizzard.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Ventisca';
                    break;
                case 'Fog':
                    video.src = 'videos/fog.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Niebla';
                    break;
                case 'Freezing fog':
                    video.src = 'videos/fog.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Niebla helada';
                    break;
                case 'Patchy light drizzle':
                    video.src = 'videos/llovizna.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Llovizna dispersa ligera';
                    break;
                case 'Light drizzle':
                    video.src = 'videos/llovizna.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Llovizna ligera';
                    break;
                case 'Freezing drizzle':
                    video.src = 'videos/llovizna.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Llovizna helada';
                    break;
                case 'Heavy freezing drizzle':
                    video.src = 'videos/llovizna.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Llovizna helada intensa';
                    break;
                case 'Patchy light rain':
                    video.src = 'videos/light_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia dispersa ligera';
                    break;
                case 'Light rain':
                    video.src = 'videos/light_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia ligera';
                    break;
                case 'Moderate rain at times':
                    video.src = 'videos/moderate_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia moderada en ocasiones';
                    break;
                case 'Moderate rain':
                    video.src = 'videos/moderate_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia moderada';
                    break;
                case 'Heavy rain at times':
                    video.src = 'videos/heavy_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia fuerte en ocasiones';
                    break;
                case 'Heavy rain':
                    video.src = 'videos/heavy_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia fuerte';
                    break;
                case 'Light freezing rain':
                    video.src = 'videos/moderate_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia helada ligera';
                    break;
                case 'Moderate or heavy freezing rain':
                    video.src = 'videos/heavy_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia helada moderada o fuerte';
                    break;
                case 'Light sleet':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Aguanieve ligera';
                    break;
                case 'Moderate or heavy sleet':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Aguanieve moderada o fuerte';
                    break;
                case 'Patchy light snow':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve dispersa ligera';
                    break;
                case 'Light snow':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve ligera';
                    break;
                case 'Patchy moderate snow':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve moderada dispersa';
                    break;
                case 'Moderate snow':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve moderada';
                    break;
                case 'Patchy heavy snow':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve fuerte dispersa';
                    break;
                case 'Heavy snow':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve fuerte';
                    break;
                case 'Ice pellets':
                    video.src = 'videos/granizo.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Granizo';
                    break;
                case 'Light rain shower':
                    video.src = 'videos/llovizna.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos ligeros';
                    break;
                case 'Moderate or heavy rain shower':
                    video.src = 'videos/heavy_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos moderados o fuertes';
                    break;
                case 'Torrential rain shower':
                    video.src = 'videos/heavy_rain.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos torrenciales';
                    break;
                case 'Light sleet showers':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos de aguanieve ligera';
                    break;
                case 'Moderate or heavy sleet showers':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos de aguanieve moderada o fuerte';
                    break;
                case 'Light snow showers':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos de nieve ligera';
                    break;
                case 'Moderate or heavy snow showers':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos de nieve moderada o fuerte';
                    break;
                case 'Light showers of ice pellets':
                    video.src = 'videos/granizo.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos de granizo ligero';
                    break;
                case 'Moderate or heavy showers of ice pellets':
                    video.src = 'videos/granizo.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Chubascos de granizo moderado o fuerte';
                    break;
                case 'Patchy light rain with thunder':
                    video.src = 'videos/thunder.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia dispersa ligera con truenos';
                    break;
                case 'Moderate or heavy rain with thunder':
                    video.src = 'videos/thunder.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Lluvia moderada o fuerte con truenos';
                    break;
                case 'Patchy light snow with thunder':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve dispersa ligera con truenos';
                    break;
                case 'Moderate or heavy snow with thunder':
                    video.src = 'videos/snow.mp4';
                    clima_actual.style.color = 'black';
                    condicion_actual.textContent = 'Nieve moderada o fuerte con truenos';
                    break;

            }

            input_ciudad.value = '';
        }
        catch (error) {
            const errorCiudad = document.createElement('h2');
            errorCiudad.textContent = 'ERROR';
            clima_actual.appendChild(errorCiudad);
            const ingrese_nuevamente = document.createElement('h3');
            ingrese_nuevamente.textContent = 'Ingrese nuevamente';
            clima_actual.appendChild(ingrese_nuevamente);
            const iconoError = document.createElement('img');
            iconoError.src = 'img/error.png';
            iconoError.style.height = '50px';
            iconoError.style.width = '50px';
            clima_actual.appendChild(iconoError);
            clima_actual.style.backgroundColor = 'red';
            video.src = 'videos/error.mp4';
            input_ciudad.value = '';

        }
    }
}

boton.addEventListener('click', buscarCiudad);
input_ciudad.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        buscarCiudad();
    }
});