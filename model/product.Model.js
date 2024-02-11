const { ObjectId } = require("mongodb");
const ConnectToMongoDB = require("../utils/singelton")
const dbCollection = "products";

async function find() {
    const db = await new ConnectToMongoDB().Get()
    const products = await db.collection(dbCollection).find({}).toArray();
    return products;
}
async function findById(id) {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const product = await db.collection(dbCollection).findOne({ ProductId: id })
        resolve(product)
    })
}
async function update(id, payload) {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const upadteResult = await db.collection(dbCollection).updateOne({ ProductId: id }, {
            $set: { ...payload }
        })
        resolve(upadteResult)
    })
}
async function deleteProduct(id) {
    const db = await new ConnectToMongoDB().Get();
    return new Promise(async (resolve, reject) => {
        const deleteResult = await db.collection(dbCollection).deleteOne({ ProductId: id })
        resolve(deleteResult)
    })
}

async function createProduct(product) {
    const db = await new ConnectToMongoDB().Get()
    return new Promise(async (resolve, reject) => {
        const createResult = await db.collection(dbCollection).insertOne(product)
        resolve(createResult)
    })

}

const ProductModel = {
    find,
    findById,
    update,
    deleteProduct,
    createProduct,
}
module.exports = ProductModel