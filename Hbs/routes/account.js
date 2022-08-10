const express = require('express');
const { Router } = express

const Container = require('../Utils/conteiner');

const router = Router();
const totalProductos = new Container('./routes/stock.json')


router.get('/',async (req,res)=>{
    let prods = await totalProductos.getAll();

    res.render('main',{
        productos:prods
    });
})

 router.get('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const prodId = await totalProductos.getById(id);
    prodId?res.json(prodId):res.status(404).end();
})

router.delete('/:id', async(req,res)=>{
    const id = Number(req.params.id);
    totalProductos.deleteById(id);
    res.status(204).end();
})

router.post('/', async (req,res)=>{
    const {nombre,precio,url} =  req.body;
    const productoAgregado= await totalProductos.save(nombre,precio,url);
    res.redirect('/api/productos')
})

router.put('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const {product, price} = req.body;
    await totalProductos.update(id,product, price);
    res.status(200).end();

})  



module.exports = router