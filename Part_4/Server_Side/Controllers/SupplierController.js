let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

let bodyParser = require('body-parser')
router.use(bodyParser.json())

let supplierModel = require('../Model/Suppliers')
let supplierActions = require('../Actions/SupplierActions')

router.get('/getAllSuppliers', (req, res) => {
    supplierActions.getAllSuppliers().then((suppl) => {
        res.json(suppl)
    })
})

router.get('/getSupplierByCompanyAndPswd/:cmpny/:pswd', (req, res) => {
    supplierActions.getSupplierByCompanyAndPswd(req.params.cmpny, req.params.pswd).then((suppl) => {
        res.json(suppl)
    })
})

router.get('/getMdseBySupplier/:id', (req, res) => {
    supplierActions.getMdseBySupplier(req.params.id).then((suppl) => {
        res.json(suppl)
    })
})

router.post('/addSupplier', (req, res) => {
    let supplier = new supplierModel({
        company:req.body.company, 
        phone:req.body.phone, 
        repName:req.body.repName, 
        pswd:req.body.pswd, 
        mdse:req.body.mdse
    })

    supplierActions.addSupplier(supplier).then((sppl) => {
        res.json(sppl)
    })


})

module.exports = router