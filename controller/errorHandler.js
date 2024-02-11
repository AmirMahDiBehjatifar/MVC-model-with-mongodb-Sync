function notFound(res){
    res.writeHead(404,{"Content-Type":"application/json"})
    res.write('PAGE NOT FOUND');
    res.end();
}
const ErrorHandler = {
    notFound
}
module.exports = ErrorHandler;