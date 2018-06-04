const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const hostname = "localhost";
const port = 3051;
app = express();
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"));


var orderCount = 0;
function generateOrderId()
{
    return Math.floor(Math.random()*10000 + 1); // random number between 1- 10000
}
rainerRouter = express.Router();


function getError(statusCode,message){
    let error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function checkStorefront(storefront){
    return new Promise((resolve,reject) => {
        if (!storefront){
            reject(getError(400,"Missing required parameters!"));
        }
        else if(storefront !== "ccas-bb9630c04f")
        {
            reject(getError(403,"Wrong storefront"));
        }
        resolve({nonce_token: "ff6bfd673ab6ae03d8911"})
    })
}
rainerRouter.route("/nonce_token")
.get((req,res,next) => {
    let storefront = req.query.storefront;
    checkStorefront(storefront)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(err.statusCode).end(err.message);
    })
});

function checkOrderParameters(data){
    let token = data.token;
    let model = data.model;
    let package = data.package;
    return new Promise((resolve,reject) => {
        if(!token || !model || !package)
        {
            reject(getError(400,"Missing parameters"));
        }
        if(token !== "ff6bfd673ab6ae03d8911")
        {
            reject(getError(403,"Wrong token"));
        }
        resolve({
            model:model,
            package:package
        })
    })
}

function checkModelAndPackage(data)
{
    var model = data.model;
    var package = data.package;
    return new Promise((resolve,reject) =>{
        if(["pugetsound","olympic"].indexOf(model)< 0)
        {
            throw(getError(400,"Wrong model value!"))
        }
        if(["mtn","ltd","14k"].indexOf(package) < 0)
        {
            throw(getError(400,"Wrong package value!"))
        }
        resolve({"order_id":generateOrderId()});
        })
    
}
rainerRouter.route("/request_customized_model").
post((req,res,next) => {
    checkOrderParameters(req.body)
    .then(data => checkModelAndPackage(data))
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(err.statusCode).end(err.message);

    })

})
app.use("/rainer/v10.0",rainerRouter);

module.exports = app;
// const server = http.createServer(app);


// server.listen(port,hostname,() => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });