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


var orderCount = 0;
function generateOrderId()
{
    return Math.floor(Math.random()*10000 + 1); // random number between 1- 10000
}
orderRouter = express.Router();
orderRouter.route("/order").
post((req,res,next) => {
    console.log(req.body);
    let api_key = req.body.api_key;
    let model = req.body.model;
    let package = req.body.package;
    if(!api_key || !model || !package)
    {
        res.status(422).json({"err":"Missing required parameters"});
        return;
    }
    if(api_key !== "cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6")
    {
        res.status(400).json({"err":"Wrong Api key!"});
        return;
    }
    if(["anvil","wile","roadrunner"].indexOf(model)< 0)
    {
        res.status(400).json({"err":"Wrong model value!"});
        return;
    }
    if(["std","super","elite"].indexOf(package) < 0)
    {
        res.status(400).json({"err":"Wrong package value!"});
        return;
    }
    orderCount += 1;


    res.json({"order":generateOrderId()});


    

})
app.use("/acme/api/v45.1",orderRouter);


module.exports = app;
// const server = http.createServer(app);


// server.listen(port,hostname,() => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });