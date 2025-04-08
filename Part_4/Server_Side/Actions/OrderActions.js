const orderModel = require("../Model/Orders")

const orderFuncs = {
    getAllOrders: async function getAllOrders() {
        const Orders = await orderModel.find({})
        return Orders
    },
    getOrdersBySupplier: async function getOrdersBySupplier(supplier) {
        const Orders = await orderModel.find({company: supplier})
        return Orders
    },
    getOrdersByStatus: async function getOrdersByStatus(st) {
        const Orders = await orderModel.find({status: st})
        return Orders
    },
    addOrder: async function addOrder(order) {
        const Orders = await order.save()
        return Orders
    },
    updateOrderStatus: async function updateOrderStatus(id, st) {
        await orderModel.updateOne(
            {_id: id},
            {$set: {status: st}}
        )
    }
}
module.exports = orderFuncs