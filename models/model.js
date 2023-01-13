const mongoose = require("mongoose")
const todoSchema =new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Todo = new mongoose.model("Todo",todoSchema)
module.exports=Todo
