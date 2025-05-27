const mongoose=require('mongoose');

const ActivitySchema=new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  Activity:{
    type:String,
    required:true
  },
  Status:{
    type:String,
    required:true
  }
},{collection:'Activities',timestamps:true})

module.exports=mongoose.model('Activity',ActivitySchema);