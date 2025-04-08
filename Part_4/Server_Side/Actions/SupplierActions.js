const supplierModel = require("../Model/Suppliers")

const supplierFuncs = {
    getAllSuppliers: async function getAllSuppliers() {
        const Suppliers = await supplierModel.find({})
        return Suppliers
    },
    getSupplierByCompanyAndPswd: async function getSupplierByCompanyAndPswd(cmpny, pswd) {
        const Supplier = await supplierModel.find({company: cmpny, pswd: pswd})
        return Supplier[0]
    },
    getMdseBySupplier: async function getMdseBySupplier(id) {
        const Supplier = await supplierModel.findOne({_id: id})
        return Supplier
    },
    addSupplier: async function addSupplier(supplier) {
        const Suppliers = await supplier.save()
        return Suppliers
    }
}
module.exports = supplierFuncs