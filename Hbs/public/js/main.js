const socket = io()

socket.on('connect', ()=>{
    console.log('Conectado al Servido');
})

socket.on('MOSTRAR_PRODUCTOS', (msg)=>{
    document.getElementsByClassName('lista').innerHTML = "" ;
    Catalogo(msg)
})

socket.on('NUEVO_PRODUCTO', (msg)=>{
    nuevoProductos(msg)
})

function nuevoProductos(info){
    document.getElementsByClassName('lista').innerHTML +=`
        <tr>    
            <td>${info.Id}</td>
            <td>${info.Data}</td>
            <td>${info.Price}</td>
            <td><img width="50" src={${this.Img}} alt="img-item">
        </tr>
    `
}

function AgregarProducto (){
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const url = document.getElementById('url').value;
    socket.emit('ENVIAR_PRODUCTO',{ nombre, precio, url})
}

const Catalogo =  (prods) => {

        return fetch("../views/main.hbs").then((resp) => {
            return resp.text();
        }).then((text) => {
          const template = Handlebars.compile(text);
          const html = template({prods:prods});
          document.getElementById('listado-prods').innerHTML = html;
        });
}



//    CHAT



socket.on('connect', ()=>{
    console.log('Conectado al CHAT del servidor');
})

socket.on('TOTAL_MENSAJES',(msg)=>{
    document.getElementById('chat').innerHTML = ''
    MensajesRecibidos(msg)
})
socket.on('NUEVO_MENSAJE', (msj)=>{
    agregarMsj(msj)
})

function agregarMsj(msg) {
    
    document.getElementById("msj-chat").innerHTML += `
        <div>
          <b class="infoMail" style="color: black">${msg.email}:</b> 
          <b class="infoMail" style="color: rgb(76, 216, 118)">${msg.Date}:</b> 
          <b class="infoMsj" style="color: black">${msg.mensaje}</b> 

          </hr>
        </div>
    `;
} 

const MensajesRecibidos =  (msj) => {

    return fetch("../views/partials/chat.hbs").then((resp) => {
        return resp.text();
    }).then((text) => {
      const template = Handlebars.compile(text);
      const html = template({msj:msj});
      document.getElementById('msj-chat').innerHTML = html;
    });
}   

function enviarMensaje(){
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    socket.emit('ENVIAR_MENSAJE', { email, mensaje })

}