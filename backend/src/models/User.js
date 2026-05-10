const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
     type:String,
     trim:true,
     required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^\S+@\S+\.\S+$/, 'Please use a valid email']
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:6,
        select:false
    },
    currency:{
        type:String,
        default:"PKR"
    },

},{timestamps:true});

module.exports  = mongoose.model("User",userSchema);
