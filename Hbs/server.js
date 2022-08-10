const express = require('express');
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

const hbs = handlebars.create({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partials'

})
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static( 'public'));
app.use('/api/productos',router);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


socketServer.on('connection', async(socket)=>{
    console.log('Nuevo cliente conectado');
    const productos = await nvoCont.getAll();
    console.log(productos);
    socket.emit(events.MOSTRAR_PRODUCTOS,productos)
    
    socket.on(events.ENVIAR_PRODUCTO, (info)=>{
        const _info = {...info,
            date: Date.now()
        }
        
    })

})





const PORT = process.env.PORT || 2020
httpServer.listen(PORT, ()=>{
    console.log(`El servidor se esta ejecutando en el puerto ${PORT}`);
})