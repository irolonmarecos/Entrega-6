const express = require('express');
const { Router } = express
const Container = require('../Utils/conteiner');

const router = Router();
const totalProductos = new Container('./routes/stock.json')


router.get('/',async (req,res)=>{
    let prods = await totalProductos.getAll();
    console.log(prods);
    res.render('main',{
        prods:prods
    });
})

module.exports = router