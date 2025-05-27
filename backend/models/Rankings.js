const mongoose=require('mongoose');
const { collection } = require('./Volunteer');

const rankingSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  tasksCompleted:{
    type:Number,required:true
  }
},{collection:'Rankings'})

module.exports=mongoose.model('Rankings',rankingSchema);