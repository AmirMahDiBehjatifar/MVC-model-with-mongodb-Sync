const ProductModel = require("../model/product.Model");

async function GetProduct(req, res) {
    const product = await ProductModel.find();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(product));
    res.end();
}

async function GetProductById(req, res) {
    const ID = req.url.split("/")[3];
    const product = await ProductModel.findById(ID);
    if (!product) {
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "PRODUCT NOT FOUND" }))
        res.end()

    } else {
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(product))
        res.end()
    }

}
async function UpdateProduct(req, res) {
    try {
        let body = '';
        const ID = req.url.split("/")[3];
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const parsedBody = { ...JSON.parse(body) }
            const product = await ProductModel.findById(ID)

            if (!product) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: "PRODUCT NOT FOUND" }))
                res.end()
            }
            else {
                const updateResult = await ProductModel.update(ID, parsedBody);
                res.writeHead(202, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(updateResult))
                res.end()
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}
async function DeleteProduct(req, res) {
    const ID = req.url.split("/")[3];
    const product = await ProductModel.findById(ID);
    if (!product) {
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "PRODUCT NOT FOUND" }))
        res.end()

    } else {
        const deleteResult = await ProductModel.deleteProduct(ID)
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(deleteResult))
        res.end()
    }
}
async function CreateProduct(req, res) {
    try {
        let body = '';
        let productID = Math.trunc(Math.random() * 1000)
        req.on('data', (chunk) => {
            body += chunk.toString();
        })
        req.on('end', async () => {
            const Product = { ...JSON.parse(body), ProductId: productID.toString() };
            const createResult = await ProductModel.createProduct(Product)
            res.writeHead(202, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(createResult))
            res.end()
        })
    } catch (error) {
        console.log(error.message);
    }

}
const ProductController = {
    GetProduct,
    GetProductById,
    UpdateProduct,
    DeleteProduct,
    CreateProduct,
}
module.exports = ProductController