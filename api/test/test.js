process.env.NODE_ENV = "test";
const http = require("http");
const assert = require("assert");

// var request = require("supertest");
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);


mockgoose.helper.setDbVersion("3.2.1");
before((done) => {
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://localhost:27017/vehicles');
        mongoose.connection.on('connected', () => {  
        console.log('db connection is now open');
        done()
        // var app = require("../Service/app");
        // done();
        }); 
    });
})


describe("Route /order and /orders Test",()=>{
    var server;
    var acmeServer;
    var rainerServer;
    before((done)=>{
        // server = require("../index");
        let app = require("../Service/app");
        server = http.createServer(app);
        server.listen(8000,"localhost",() => {
            console.log(`Server running at http://localhost:8000`);
                    //run the api suppliers
                let acme = require("../Suppliers/acme/acme");
                acmeServer = http.createServer(acme);
                acmeServer.listen(3050,"localhost",() => {
                    console.log(`acme running at http://localhost:3050`);
                    let rainer = require("../Suppliers/rainer/rainer");
                    rainerServer = http.createServer(rainer);
                    rainerServer.listen(3051,"localhost",() => {
                        console.log(`rainer running at http://localhost:3051`);
                        done()
                        });
                });
            });



 
        
    });

    // beforeEach(()=>{

    // })
    //empty arguements
    it("Empty arguements",(done) =>{
        chai.request(server)
        .post("/order")
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })
    //missing arguement make
    it("missing field make",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            model:"wile",
            package:"std",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })



    //missing field model
    it("missing field model",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            package:"std",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

       //missing field package
       it("missing field package",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            model:"wile",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

       //missing field customer_id
       it("missing field customer_id",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            model:"wile",
            package:"std",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

    //invalid customer_id
    it("wrong make value",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            model:"wile",
            package:"std",
            customer_id:"100",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

    //customer has invalid address
    it("wrong make value",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            model:"wile",
            package:"std",
            customer_id:"2",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

    //wrong make value
    it("wrong make value",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"Meaninglessless",
            model:"wile",
            package:"std",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

    /*********************************
     * The section below would be results of under make "acme"
     */

    //wrong model value
    it("wrong model value",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            model:"Meaningless",
            package:"std",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

        //wrong package value
        it("wrong model value",(done) =>{
            chai.request(server)
            .post("/order")
            .send({
                make:"acme",
                model:"wile",
                package:"Meaningless",
                customer_id:"1",
            })
            .end((err,res) =>{
                res.should.have.status(400);
                done();
            })
        })
    
    //should return correct response.
    it("proper request -1 acme",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            model:"wile",
            package:"std",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.have.property("status").equals("success");
            res.body.should.have.property("download_link");
            done();
        })
    })

    //should return correct response.
    it("proper request -2 acme",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"acme",
            model:"anvil",
            package:"elite",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.have.property("status").equals("success");
            res.body.should.have.property("download_link");
            done();
        })
    })

    /****************************************
     * the section below is testing orders under make  "rainer"
     */
    it("wrong model value",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"rainer",
            model:"Meaningless",
            package:"ltd",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(400);
            done();
        })
    })

        //wrong package value
        it("wrong model value",(done) =>{
            chai.request(server)
            .post("/order")
            .send({
                make:"rainer",
                model:"olympic",
                package:"Meaningless",
                customer_id:"1",
            })
            .end((err,res) =>{
                res.should.have.status(400);
                done();
            })
        })
    
    //should return correct response.
    it("proper request -1 rainer",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"rainer",
            model:"olympic",
            package:"ltd",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.have.property("status").equals("success");
            res.body.should.have.property("download_link");
            done();
        })
    })

    //should return correct response.
    it("proper request -2 rainer",(done) =>{
        chai.request(server)
        .post("/order")
        .send({
            make:"rainer",
            model:"pugetsound",
            package:"14k",
            customer_id:"1",
        })
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.have.property("status").equals("success");
            res.body.should.have.property("download_link");
            done();
        })
    })

    //testing the get of orders
    it("Get /orders missing username and password" , (done) =>{
        chai.request(server)
        .get("/orders")
        .end((err,res) =>{
            res.should.have.status(403);
            done();
        })
    })


    //testing the get of orders
    it("Get /orders wrong username" , (done) =>{
        chai.request(server)
        .get("/orders")
        .set("username","gy")
        .set("password","xixi")
        .end((err,res) =>{
            res.should.have.status(403);
            done();
        })
    })

    //testing the get of orders
    it("Get /orders wrong password" , (done) =>{
        chai.request(server)
        .get("/orders")
        .set("username","Guangyi")
        .set("password","waterfall")
        .end((err,res) =>{
            res.should.have.status(403);
            done();
        })
    })




    //testing the get of orders
    it("Get /orders proper request" , (done) =>{
        chai.request(server)
        .get("/orders")
        .set("username","Guangyi")
        .set("password","firelord")
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.length.should.equals(4) // 4 proper request sent
            res.body[0].should.have.property("order_id");
            res.body[0].should.have.property("make");
            res.body[0].should.have.property("model");
            res.body[0].should.have.property("customer_id");
            done();
        })
    })
    after(()=>{
        server.close();
    })
})



// describe("Route /order Test",()=>{
//     var server;
//     before(()=>{
//         // server = require("../index");
//         server = http.createServer(app);
//         server.listen(8000,"localhost",() => {
//             console.log(`Server running at http://localhost:8000`);
//             });
//         chai.request(server)
//         .post("./order")
//     });

//     after(()=>{
//         server.close();
//         acmeServer.close()
//         rainerServer.close();
//     })
// })


after((done) => {
    mockgoose.helper.reset();
    done();
})