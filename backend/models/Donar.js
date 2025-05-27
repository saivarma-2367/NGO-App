const mongoose=require('mongoose');
const { collection } = require('./Volunteer');
const { text } = require('express');

const DonarSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },age:{
    type:Number,
    required:true
  },phoneNumber:{
    type:Number,
    required:true
  },email:{
    type:String,
    required:true
  },donationItem:{
    type:String,
    required:true
  },donationQuantity:{
    type:Number,
    required:true
  }

},{collection:'donars'})

module.exports=mongoose.model('Donar',DonarSchema);