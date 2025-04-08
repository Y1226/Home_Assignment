let mongoose = require('mongoose')

let orderSchema = new mongoose.Schema(
    {company:String, product:[{ name: String, amount: Number }], price:Number, status:String}
)

let orderModel = mongoose.model('orders', orderSchema, 'Orders')
module.exports = orderModel