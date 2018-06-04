const express = require("express");
const http = require("http");
const fs = require("fs");
const mongoose = require("mongoose");
const request = require("superagent");
const bcrypt = require("bcrypt");
const order = express.Router()


//Get the default connection
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
var mongoDB = 'mongodb://localhost:27017/vehicles';
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// mockgoose.prepareStorage().then(function() {
   		
    // console.log("Succeeded to prepare storage for mockgoose");
     // mongoose connection
mockgoose.helper.setDbVersion("3.2.1");
mockgoose.prepareStorage().then(() => {
    mongoose.connect(mongoDB);
    mongoose.connection.on('connected', () => {  
    console.log('db connection is now open');
    }); 
});
// mongoose.connect(mongoDB);
    //Bind connection to error event (to get notification of connection errors)
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// }).catch((err) => console.log(err));

var orderSchema = require("../models/order");
var customerSchema = require("../models/customer")
var userSchema = require("../models/users")

function getError(statusCode,payload){
    err = new Error(payload);
    err.statusCode = statusCode;
    return err;
}

function checkParameters(data)
{
    var make = data.make;
    var model = data.model;
    var package = data.package;
    var customer_id = data.customer_id;
    //checking if we are missing some parts of required parameters
    return new Promise((resolve,reject) =>{
        if(!make || !model || !package ||  !customer_id)
        {
            reject(getError(400,"Missing parameters!"))
        }
        resolve({
            make:data.make,
            model:data.model,
            package:data.package,
            customer_id:data.customer_id
        })
    })

}

//check if customer is valid or hes/her address is valid
function getCustomerInfo(data){
    return  customerSchema.findOne({customer_id:data.customer_id})
        .exec()
        .catch((err) => {
            throw getError(503, 'Mongodb find Error')
        })
        .then((customer) => {
            if(!customer){                    
                throw getError(400,"The customer cannot be recongnized!");
            }
            else if(customer.address.country !== "US") // if the address is not US
            {
                throw getError(400,"Unreachable address!");  
            }
            else{
                return data;
            }
        })


}

function postOrderToAcme(data){
    return  request
            .post("http://localhost:3050/acme/api/v45.1/order")
            .timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            .set("Content-Type", "application/x-www-form-urlencoded")
            .send({
                "api_key": "cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6",
                "model":data.model,
                "package":data.package
            })
            .then((res) => {
                var order_id = res.body.order;
                //return order id and all the parameters back
                return {
                    order_id:order_id,
                    make:data.make,
                    model:data.model,
                    package:data.package,
                    customer_id:data.customer_id
                } 
            })
            .catch((err) => {
                throw getError(400,err.response.text);
            })
            
}

function postOrderToRainer(data){
    return  request
            .get("http://localhost:3051/rainer/v10.0/nonce_token?storefront=ccas-bb9630c04f")
            .timeout({
                response: 5000,  // Wait 5 seconds for the server to start sending,
                deadline: 60000, // but allow 1 minute for the file to finish loading.
            })
            .then((res) => {
                let token = res.body.nonce_token;
                return request
                .post("http://localhost:3051/rainer/v10.0/request_customized_model")
                .timeout({
                    response: 5000,  // Wait 5 seconds for the server to start sending,
                    deadline: 60000, // but allow 1 minute for the file to finish loading.
                })
                .send({
                    token:token,
                    model:data.model,
                    package:data.package,
                })
            })
            .then((res) => {
                return {
                    order_id:res.body.order_id,
                    make:data.make,
                    model:data.model,
                    package:data.package,
                    customer_id:data.customer_id
                }
            })
            .catch((err) => {
                throw getError(400,err.response.text);
            })

}
//to post order to suppliers
function postOrderToSupplier(data){
    if(data.make === "acme"){
        return postOrderToAcme(data);
    }
    else if (data.make === "rainer"){
        return postOrderToRainer(data);
    }
    else{
        throw getError(400,"Unrecognized make value!")
    }
}

//saving the order to database
function saveOrderToDataBase(data){
    //store information to database
    return orderSchema.create({
        order_id:data.order_id,
        make:data.make,
        model:data.model,
        package:data.package,
        customer_id:data.customer_id
    })             
    .catch((err) => {
        throw getError(500,"Mongodb Error!");
    })
}


function saveOrderToFile(data){
    base_url = "http://localhost:8000/orders/";
    let jsonData  = JSON.stringify(data,null,2);
    return new Promise((resolve,reject) => {
        let dir ="./orders"
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFile(`./orders/order-${data.order_id}.json`,jsonData,(err) => {
            if(err)
            {
                reject(getError(500,"Writing File Error!"))
            }
            console.log("Save to file successfully");
            resolve({"status":"success","download_link":base_url+`order-${data.order_id}.json`})

        })
    })
}
order.route("/order")
.post((req,res,next) => {
    // make ,model ,package ,customer_id

    checkParameters(req.body)
    // we require the customer id being stored in db at first

    .then((data)=>{return getCustomerInfo(data)})
    .then((data) => {return postOrderToSupplier(data)})
    // postOrderToSupplier(req.body)
    .then((data) => {return saveOrderToDataBase(data)})
    .then((data) => {return saveOrderToFile(data)})
    .then((data) => {
        res.json(data)
    })
    .catch((err)=>{
        res.status(err.statusCode).end(err.message);
    })
});

function checkParametersForOrders(data)
{
    let username = data.username;
    let password = data.password;
    return new Promise((resolve,reject) => {
        if(!username || ! password)
        {
            reject(getError(403,"Missing username or password!"))
        }
        resolve({
            username:username,
            password:password
        })
    })
}


function searchForUser(data){
    return  userSchema.findOne({username:data.username})
    .exec()
    .catch((err) => {
        throw getError(503,"Mongodb find Error!")
    })
    .then((user) => {
        if(!user)
        {
            throw getError(403,"Unknown user!")
        }
        return {
            password:data.password,
            hash:user.password
        }
    })
}

function checkPassword(password,hash){
    return bcrypt.compare(password, hash)

}

function getOrdersInfo(result) {
    if(!result){
        throw getError(403,"Wrong password!");
    }
    return orderSchema.find({})
}


order.route("/orders")
.get((req,res,next) => {
    // this is checking the authorization of get orders

    checkParametersForOrders(req.headers)
    .then((data) => {return searchForUser(data)})
    .then((data) => {return checkPassword(data.password,data.hash)})
    .then((data) => {return getOrdersInfo(data)})
    .then((orders) => {
        res.json(orders);
    })
    .catch((err) => {
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        res.status(err.statusCode).end(err.message);
    })

});


order.route("/orders/:orderFile")
.get((req,res,next) => {
    filename = req.params.orderFile;
    fs.access("./orders/"+filename, fs.constants.F_OK, (err) => {
        if(err){
            return next(err);
        }
        res.download("./orders/"+filename);
        // console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
      });
    // res.end("hi");
})


module.exports= order;
