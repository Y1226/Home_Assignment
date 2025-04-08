const { mainMenu } = require('./Controllers/managerController')

let express = require('express')
let app = express()

let body = require('body-parser')
app.use(body.json())

let cors = require('cors')
app.use(cors())

let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Grocery_Suppliers')

let suppliers = require('./Controllers/SupplierController')
app.use('/suppliers', suppliers)

let orders = require('./Controllers/OrderController')
app.use('/orders', orders)

app.listen(8520, () => {
    mainMenu()
})