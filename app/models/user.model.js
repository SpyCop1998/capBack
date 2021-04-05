var mongoose=require('mongoose')
var CollectionName='JOBKRO'
var userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true
    },
    profession:{
        type:String,
        required:true
    },
    subProfession:{
        type:String
    },
    district:{
        type:String,
        required:true
    },
    // location:{
    //     type:String,
    //     required:true
    // },
    // lat:{
    //     type:Number,
    //     required:true
    // },
    // long:{
    //     type:Number,
    //     required:true
    // },
    isApproved:{
        type:Boolean,
        default:false
    },
    securityNumebr:{
        type:String,
        required:true
    },
    date: { 
        type: Date,
         default: Date.now
     }
})

module.exports=mongoose.model(CollectionName,userSchema)