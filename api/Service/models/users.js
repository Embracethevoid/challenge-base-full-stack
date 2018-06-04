// this file creates some user who has authority to look at the orders

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");


var userSchema = new Schema({
  username:{
    type: String ,
    required: true,
    unique:true
  },
  password:{
          type:String,
          required:true
    }

}

,{"colletion":"users"});

var saltRounds = 10;
var User =  mongoose.model("User",userSchema);

User.create(
  [
    {
        username:"admin",
        password:bcrypt.hashSync("admin",saltRounds)
    }
    ,
    {
        username:"Guangyi",
        password:bcrypt.hashSync("firelord",saltRounds)
    }
]
).then(() => {

}).catch((err) => {
  console.log("failed to create customer initailly.")
  console.log(err);
})

module.exports = User;
