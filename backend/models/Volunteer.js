const mongoose=require('mongoose');

const volunteerSchema= new mongoose.Schema({
  name : {
    type:String,
    required:true
  },
  email : {
    type:String,
    required:true,
    unique:true
  },
  password: {
   type: String,
   required:true
  },
  activitiesCompleted:{
    type:Number,
    required:true
  }
},{ collection: 'volunteer',timestamps:true});

module.exports=mongoose.model('Volunteer',volunteerSchema);
