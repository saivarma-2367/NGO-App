const mongoose=require('mongoose');

const invenotorySchema=new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  }
},{collection:'Items',timestamps:true});

module.exports=mongoose.model('Item',invenotorySchema);