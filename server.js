const http = require("http");
const ProductController = require("./controller/product.Controller")
const ErrorHandler = require("./controller/errorHandler");
const PORT = 3000;

const Server = http.createServer((req, res) => {
    const { url, method } = req;
    const api = '/api';
    const productRoutte = `${api}/products`;
    const idRoutte = /\/api\/products\/[0-9]+/

    if (url == productRoutte && method == "GET") {
        ProductController.GetProduct(req, res)
    } else if (url.match(idRoutte) && method == "GET") {
        ProductController.GetProductById(req, res)
    } else if (url.match(idRoutte) && method == "PUT") {
        ProductController.UpdateProduct(req, res)
    } else if (url.match(idRoutte) && method == "DELETE") {
        ProductController.DeleteProduct(req, res)
    }else if ( url == productRoutte && method == "POST") {
        ProductController.CreateProduct(req,res)
    } else {
        ErrorHandler.notFound(res)
    }

})
Server.listen(3000);
console.log(`Server is runned on PORT:${PORT} URL:http://localhost:${PORT}`);