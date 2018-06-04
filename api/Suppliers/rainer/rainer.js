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
rainerRouter.route("/nonce_token")
.get((req,res,next) => {
    let storefront = req.query.storefront;
    if (!storefront){
        res.status(422).end("Missing required parameters!");
    }
    else if(storefront !== "ccas-bb9630c04f")
    {
        res.status(403).json({"err":"Wrong StoreFront"}).end();
    }
    else{
        res.json({nonce_token: "ff6bfd673ab6ae03d8911"})
    }
});
rainerRouter.route("/request_customized_model").
post((req,res,next) => {
    console.log(req.body);
    let token = req.body.token;
    let model = req.body.model;
    let package = req.body.package;
    if(!token || !model || !package)
    {
        res.status(422).end("Missing required parameters");
        return;
    }
    if(token !== "ff6bfd673ab6ae03d8911")
    {
        res.status(400).end("Wrong Api key!");
        return;
    }
    if(["pugetsound","olympic"].indexOf(model)< 0)
    {
        res.status(400).end("Wrong model value!");
        return;
    }
    if(["mtn","ltd","14k"].indexOf(package) < 0)
    {
        res.status(400).end("Wrong package value!");
        return;
    }
    orderCount += 1;
    res.json({"order":generateOrderId()});

})
app.use("/rainer/v10.0",rainerRouter);

module.exports = app;
// const server = http.createServer(app);


// server.listen(port,hostname,() => {
//   console.log(`Server running at http://${hostname}:${port}`);
// });