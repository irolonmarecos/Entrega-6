const express = require('express');
const moment = require('moment')

const {Server:SocketServer} = require('socket.io')
const {Server:HTTPServer} = require('http');

const app = express();
const handlebars = require('express-handlebars');
const router = require('./routes/account');
const events = require('./public/js/sockets_events');
const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
const Contenedor = require('./Utils/conteiner');
const nvoCont = new Contenedor('./routes/stock.json')
const nvoChat = new Contenedor('./routes/mensajes.json')
const hbs = handlebars.create({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/public/views/layout',
}) 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static( 'public'));
app.use('/api/productos',router);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './public/views');

socketServer.on('connection', async(socket)=>{
    console.log('Nuevo cliente conectado');
    const productos = await nvoCont.getAll();
    socket.emit(events.MOSTRAR_PRODUCTOS,productos)
    socket.on(events.ENVIAR_PRODUCTO,async (info)=>{
        const _info = {...info,
            date: Date.now()
        }
        const prod = {Producto:_info.nombre}
        await nvoCont.save(prod.Producto,_info.precio,_info.url,_info.date)
        socketServer.sockets.emit(events.NUEVO_PRODUCTO,_info)
    }) 
})

socketServer.on('connection', async(socket)=>{
    const mensajes = await nvoChat.getAllMsj();
    socketServer.emit(events.TOTAL_MENSAJES, mensajes)
    socket.on(events.ENVIAR_MENSAJE, async(msg)=>{
        const _msg ={...msg,
        Id:socket.id,
        Date: moment().format("dddd  D/MM/YYYY")}
        await nvoChat.saveMsj(_msg)
        socketServer.sockets.emit(events.NUEVO_MENSAJE, _msg)
    })
})

const PORT = process.env.PORT || 2020
httpServer.listen(PORT, ()=>{
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);
})