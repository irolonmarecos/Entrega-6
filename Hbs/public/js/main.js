const socket = io()
const events = require('./sockets_events');


socket.on('connect', ()=>{
    console.log('Conectado al Servido');
})

function nuevoProductos(info){
    document.getElementsByClassName('lista').innerHTML +=`
        <tr>    
            <td>${info.id}</td>
            <td>${info.product}</td>
            <td>${info.price}</td>
            <td><img width="50" src={${this.img}} alt="img-item">
        </tr>
    `
}

function AgregarProducto (){
    const nombre = document.getElementsByClassName('nombre').value;
    const precio = document.getElementsByClassName('precio').value;
    socket.emit(events.MOSTRAR_PRODUCTOS,{ nombre, precio})

}
