document.addEventListener('DOMContentLoaded', buscarYMostrarEstablecimientos);

async function buscarYMostrarEstablecimientos() {
    const heading = document.querySelector('.heading-section');
    heading.innerHTML = '<em>Cargando</em> Establecimientos...';

    try {
        const establecimientos = await buscarEstablecimientosNocturnosOSM();
        heading.innerHTML = '<em>Establecimientos Nocturnos</em> Bogotá';

        const containerRow = document.getElementById('establecimientos-container');
        containerRow.innerHTML = '';

        establecimientos.forEach(lugar => {
            const card = document.createElement('div');
            card.className = 'col-lg-3 col-sm-6';

            card.innerHTML = `
                <div class="item" data-id="${lugar.id}">
                    <img src="${lugar.imagen}" alt="${lugar.nombre}">
                    <h4>${lugar.nombre}<br><span>${lugar.direccion}</span></h4>
                    <ul>
                        <li><i class="fa fa-map-marker"></i> ${(lugar.distancia / 1000).toFixed(1)} km</li>
                        <li><i class="fa fa-info-circle"></i> ${lugar.tipo}</li>
                    </ul>
                    <button class="reservar-btn" onclick="window.location.href='Form.html'">Reservar</button>
                </div>
            `;

            containerRow.appendChild(card);
        });
    } catch (error) {
        console.error('Error al cargar establecimientos:', error);
        heading.innerHTML = '<em>Error</em> al cargar datos';
    }
}

async function buscarEstablecimientosNocturnosOSM() {
    const lat = 4.6097;
    const lon = -74.0817;
    const radio = 1000;

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
    if (![lat1, lon1, lat2, lon2].every(coord => typeof coord === 'number')) return 99999;
    const R = 6371e3;
    const toRad = value => value * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}