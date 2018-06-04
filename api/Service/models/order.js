var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var orderSchema = new Schema({
  order_id:{
    type: String ,
    required: true,
  },
  make:{
    type:String,
    required:true
  },
  model:{
    type:String,
    required:true
  },
  package:{
    type:String,
    required:true
  },
  customer_id:{
    type:String,//??
    required:true
  }

},{"collection":"orders"});
orderSchema.index({order_id:1,make:1},{unique:true});
var Order =  mongoose.model("Order",orderSchema);

module.exports = Order;
