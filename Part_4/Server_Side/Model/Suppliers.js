let mongoose = require('mongoose')

let supplierSchema = new mongoose.Schema({
    company:String, 
    phone:String, 
    repName:String, 
    pswd:String, 
    mdse:[{
        pdct:String, 
        price:Number, 
        amount:Number
    }]
})

let supplierModel = mongoose.model('suppliers', supplierSchema, 'Suppliers')
module.exports = supplierModel