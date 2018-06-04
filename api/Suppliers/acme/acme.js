const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const hostname = "localhost";


const port = 3050;
app = express();
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"));



function generateOrderId()
{
    return Math.floor(Math.random()*10000 + 1); // random number between 1- 10000
}

function getError(statusCode,message){
    let error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function checkOrderParameters(data){
    let api_key = data.api_key;
    let model = data.model;
    let package = data.package;
    return new Promise((resolve,reject) => {
        if(!api_key || !model || !package)
        {
            reject(getError(400,"Missing parameters"));
        }
        if(api_key !== "cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6")
        {
            reject(getError(403,"Wrong api key"));
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
        if(["anvil","wile","roadrunner"].indexOf(model)< 0)
        {
            reject(getError(400,"Wrong model value!"))
        }
        if(["std","super","elite"].indexOf(package) < 0)
        {
            reject(getError(400,"Wrong package value!"))
        }
        resolve({"order":generateOrderId()});
    })
    
}

orderRouter = express.Router();
orderRouter.route("/order").
post((req,res,next) => {
    checkOrderParameters(req.body)
    .then(data => checkModelAndPackage(data))
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
        res.status(err.statusCode).end(err.message);

    })    

})
app.use("/acme/api/v45.1",orderRouter);


module.exports = app;
// const server = http.createServer(app);


// server.listen(port,hostname,() => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });