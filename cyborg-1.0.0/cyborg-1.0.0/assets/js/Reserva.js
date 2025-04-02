let reservas = [];


document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const zona = document.getElementById('zona').value;
    const comentarios = document.getElementById('comentarios').value;

    
    const existeReserva = reservas.some(reserva => reserva.fecha === fecha && reserva.hora === hora);

    if (existeReserva) {
       
        alert('¡Ya hay una reserva para esa fecha y hora! Por favor, elige otro horario.');
        return; 
    }


    const reserva = {
        nombre,
        email,
        telefono,
        personas,
        fecha,
        hora,
        zona,
        comentarios
    };


    reservas.push(reserva);

 
    alert('Reserva realizada correctamente');


    document.getElementById('reservationForm').reset();

    
    console.log(reservas); 
});
