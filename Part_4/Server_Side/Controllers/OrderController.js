let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let bodyParser = require('body-parser')
router.use(bodyParser.json())

let orderModel = require('../Model/Orders')
let orderActions = require('../Actions/OrderActions')

router.get('/getAllOrders', (req, res) => {
    orderActions.getAllOrders().then((ord) => {
        res.json(ord)
    })
})

router.get('/getOrdersBySupplier/:suppl', (req, res) => {
    orderActions.getOrdersBySupplier(req.params.suppl).then((ord) => {
        res.json(ord)
    })
})

router.get('/getOrdersByStatus/:st', (req, res) => {
    orderActions.getOrdersByStatus(req.params.st).then((ord) => {
        res.json(ord)
    })
})

router.post('/addOrder', (req, res) => {
    let order = new orderModel({
        company: req.body.company,
        product: req.body.product,
        price: req.body.price,
        status: req.body.status
    })

    orderActions.addOrder(order).then((ord) => {
        res.json(ord)
    })
})

router.put('/updateOrderStatus/:id/:st', (req, res) => {
    orderActions.updateOrderStatus(req.params.id, req.params.st).then((ord) => {
        res.json(ord)
    })
})

module.exports = router
