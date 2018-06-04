var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var customerSchema = new Schema({
  customer_id:{
    type: String ,
    required: true,
    unique:true
  },
  address:{
    country:{
          type:String,
          required:true
    },
    state:{
          type:String,
          required:true
      },
    city:{
        type:String,
        required:true
    }
}

},{"colletion":"customers"});

var Customer =  mongoose.model("Customer",customerSchema);

Customer.create(
  [
    {
        customer_id:"1",
        address:{
            country:"US",
            state:"OR",
            city:"Eugene"
        }
    }
    ,
    {
        customer_id:"2",
        address:{
            country:"RU",
            state:"Sibeira",
            city:"Somewhere"
        }
    }
]
).then(() => {

}).catch((err) => {
  console.log("failed to create customer initailly.")
  console.log(err);
})

module.exports = Customer;
