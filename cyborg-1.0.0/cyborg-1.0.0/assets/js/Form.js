// Función para buscar y mostrar establecimientos nocturnos usando OpenStreetMap
async function buscarYMostrarEstablecimientos() {
    document.querySelector('.heading-section h4').innerHTML = '<em>Cargando</em> Establecimientos...';
    
    try {
        const establecimientos = await buscarEstablecimientosNocturnosOSM();
        document.querySelector('.heading-section h4').innerHTML = '<em>Establecimientos Nocturnos</em> Bogotá';
        
        const containerRow = document.querySelector('.most-popular .row .col-lg-12 .row');
        const mainButton = document.querySelector('.main-button');
        containerRow.innerHTML = '';
        
        establecimientos.forEach(lugar => {
            const card = document.createElement('div');
            card.className = 'col-lg-3 col-sm-6';
            
            card.innerHTML = `
                <div class="item" data-id="${lugar.id}">
                    <img src="${lugar.imagen}" alt="${lugar.nombre}">
                    <h4>${lugar.nombre}<br><span>${lugar.direccion.substring(0, 20)}${lugar.direccion.length > 20 ? '...' : ''}</span></h4>
                    <ul>
                        <li><i class="fa fa-map-marker"></i> ${(lugar.distancia/1000).toFixed(1)} km</li>
                        <li><i class="fa fa-info-circle"></i> ${lugar.tipo}</li>
                    </ul>
                </div>`;
            
            card.querySelector('.item').addEventListener('click', () => {
                mostrarDetallesEstablecimiento(lugar);
            });
            
            containerRow.appendChild(card);
        });
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'col-lg-12';
        buttonContainer.appendChild(mainButton);
        containerRow.appendChild(buttonContainer);
        
        const botonDescubrir = mainButton.querySelector('a');
        botonDescubrir.textContent = 'Ver más establecimientos';
        botonDescubrir.href = '#';
        botonDescubrir.onclick = (e) => {
            e.preventDefault();
            buscarYMostrarEstablecimientos(true);
        };
        
    } catch (error) {
        console.error('Error al cargar establecimientos:', error);
        document.querySelector('.heading-section h4').innerHTML = '<em>Error</em> al cargar datos';
    }
}

async function buscarEstablecimientosNocturnosOSM(radioExpandido = false) {
    const lat = 4.6097;
    const lon = -74.0817;
    const radio = radioExpandido ? 2000 : 1000;
    
    const query = `[out:json][timeout:25];(
        node["amenity"="bar"](around:${radio},${lat},${lon});
        node["amenity"="pub"](around:${radio},${lat},${lon});
        node["amenity"="nightclub"](around:${radio},${lat},${lon});
    ); out body;`;
    
    try {
        const response = await fetch('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query));
        if (!response.ok) throw new Error(`Error en la petición: ${response.status}`);
        
        const data = await response.json();
        return data.elements.map(element => ({
            id: element.id,
            nombre: element.tags.name || 'Establecimiento nocturno',
            tipo: element.tags.amenity || 'Bar',
            direccion: element.tags['addr:street'] || 'Bogotá',
            lat: element.lat,
            lon: element.lon,
            distancia: calcularDistancia(lat, lon, element.lat, element.lon),
            imagen: 'assets/images/popular-01.jpg'
        }));
        
    } catch (error) {
        console.error("Error al buscar establecimientos:", error);
        throw error;
    }
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 99999;
    const R = 6371e3;
    const toRad = value => value * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

document.addEventListener('DOMContentLoaded', () => {
    buscarYMostrarEstablecimientos();
});

async function buscarYMostrarTopEstablecimientos() {
    document.querySelector('.heading-section h4').innerHTML = '<em>Cargando</em> Establecimientos...';

    try {
        // Llamamos a la API de OSM para obtener los establecimientos
        const establecimientos = await buscarEstablecimientosNocturnosOSM();
        document.querySelector('.heading-section h4').innerHTML = '<em>Top Establecimientos</em> de la Semana';

        // Tomamos solo los primeros 3 o 4 establecimientos
        const topEstablecimientos = establecimientos.slice(0, 4);
        
        // Modificamos el HTML para mostrar los 3 primeros establecimientos
        const container = document.querySelector('.gaming-library .col-lg-12');
        container.innerHTML = '';

        topEstablecimientos.forEach(establishment => {
            const card = document.createElement('div');
            card.className = 'item';
            card.innerHTML = `
                <ul>
                    <li><img src="${establishment.imagen}" alt="" class="templatemo-item"></li>
                    <li><h4>${establishment.nombre}</h4><span>${establishment.tipo}</span></li>
                    <li><h4>Date Added</h4><span>${establishment.direccion}</span></li>
                    <li><h4>Hours Played</h4><span>${establishment.distancia.toFixed(1)} km</span></li>
                    <li><h4>Currently</h4><span>Downloaded</span></li>
                    <li><div class="main-border-button"><a href="#">Download</a></div></li>
                </ul>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error al cargar establecimientos:', error);
        document.querySelector('.heading-section h4').innerHTML = '<em>Error</em> al cargar datos';
    }
}

// Llamamos a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    buscarYMostrarTopEstablecimientos();
});
