const express = require('express')
const {productsModel} = require('../models/products.model')

const router       = express.Router()
const productsService = new ProductsManagerFS()

router
    .post('/', async (req, res)=>{
        try {
            const {title, description, code, price, status, stock, category, thumbnails } = req.body
   
            const productNew = {
                title,
                description,
                code,
                price, 
                status, 
                stock, 
                category, 
                thumbnails
            }

    const result = await productsModel.create(productNew)
            //console.log(result)
            res.send({
                stauts: 'success',
                payload: result
            })
        } catch (error) {
            res.status(500).send(`Error de server ${error.message}`)
        }
        // res.send('create carts')
    })
    .get('/', async (req, res)=>{
        try {
            const limit = req.query.limit;
            //console.log("LIMITE = " + limit)
            const products = await productsModel.find({})
            
            //console.log(products)
            res.send({
                stauts: 'success',
                payload: products
            })
        } catch (error) {
            res.status(500).send(`Error de server ${error.message}`)
        }
    })
    .get('/:pid', async (req, res)=>{
        try {
            const {pid} = req.params
            const products = await productsModel.findOne({_id: pid})
            res.send({
                status: 'success',
                payload: products
            })
        } catch (error) {
            console.log(error)
        }
        // res.send('get cart')
    })
    .put('/:pid', async (req, res)=>{
        try {
            const {pid} = req.params
            const bodyData = req.body;
            const result = await productsModel.findOneAndUpdate({_id: pid}, bodyData, {new: true})
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    })
    .delete('/:pid', async (req, res)=>{
        try {
            const {pid} = req.params
            const result = await productsModel.findByIdAndDelete({_id: pid})
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
    })
    /*.post('/:cid/products/:pid', async (req, res)=>{
        try {
            const {cid, pid} = req.params // pid es el id de producto
            const result = await productsService.addProductToCart(Number(cid), Number(pid))
            res.send({
                status: 'success',
                payload: result
            })
        } catch (error) {
            console.log(error)
        }
        
    })*/

module.exports = router
