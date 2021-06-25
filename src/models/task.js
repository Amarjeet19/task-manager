const mongoose = require('mongoose')

const Task=mongoose.model('Task',{
    desc:{
      type:String,
      trim:true,
      required:true
    },
    comp:{
        type:Boolean,
        default:false
    }
})

module.exports=Task
