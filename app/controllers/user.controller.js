var User=require('../models/user.model')

exports.check=(req,res)=>{//for just cheking if server is live
    res.send({
        message:"..Sup Dawg"
    })
}

exports.create=(req,res)=>{//for register the user
    if(!req.body.userName){
        return res.status(400).send({
            response_code:801,
            response:"userName is missing"
        })
    }

    if(!req.body.mobileNumber){
        return res.status(400).send({
            response_code:801,
            response:"mobileNumer is missing"
        })
    }

    if(!req.body.profession){
        return res.status(400).send({
            response_code:801,
            response:"profession is missing"
        })
    }

    if(!req.body.district){
        return res.status(400).send({
            response_code:801,
            response:"location is missing"
            
        })
    }
    // if(!req.body.lat){
    //     return res.status(400).send({
    //         response_code:801,
    //         response:"lat is missing"
            
    //     })
    // }

    // if(!req.body.long){
    //     return res.status(400).send({
    //         response_code:801,
    //         response:"long is missing"
            
    //     })
    // }

    var randV=makeid(6)

    var user=new User({
        userName:req.body.userName,
        mobileNumber:req.body.mobileNumber,
        profession:req.body.profession,
        subProfession:req.body.subProfession || null,
        district:req.body.district,
        // lat:req.body.lat,
        // long:req.body.long,
        securityNumebr:randV
    })

    user.save().then(data=>{
        res.send({
            response_code:200,
            response:"user saved successfully",
            securityNumber:randV
        })
    }).catch(err=>{
        if(err.code==11000){
            return res.status(400).send({
                response_code:202,
                response:"user alreary registered with mobile number"
            })
        }
        res.status(400).send({
            response_code:800,
            response:"error occured "+err.message
        })
    })
}

function makeid(length) {//for generating random numbers
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


exports.findAll=(req,res)=>{//for getting user's list
    User.find().then(user=>{
        res.send({
            response_code:200,
            response:"got the list successfully",
            data:user
        })
    }).catch(err=>{
        res.status(400).send({
            response_code:800,
            response:"error occured "+err.message
        })
    })
}


exports.findByDistrict=(req,res)=>{
    User.find({district:req.body.district}).then(user=>{
        res.send({
            response_code:200,
            response:"get the list successfully",
            data:user
        })
    }).catch(err=>{
        res.send({
            response_code:800,
            response:"error while geting list from db"+err.message
        })
    })
}

exports.findByStatus=(req,res)=>{//find by status
    // console.log(req.body.isApproved);
    // return;
    if(req.body.isApproved==undefined){
       return res.status(400).send({
            response_code:801,
            response:"isApproved is missing"
        })
    }

    User.find({isApproved:req.body.isApproved}).then(user=>{
        res.send({
            response_code:200,
            response:"got the list successfully",
            data:user
        })
    }).catch(err=>{
       return res.status(400).send({
            response_code:800,
            response:"error occured "+err.message
        })
    })
}


exports.updateStatus=(req,res)=>{//for update status
    //mobileNo of user,status
    if(!req.body.mobileNumber){
        return res.status(400).send({
            response_code:801,
            response:"mobileNumber is missing"
        })
    }
    if(req.body.isApproved==undefined){
        return res.status(400).send({
            response_code:801,
            response:"status is missing"
        })
    }
    User.findOneAndUpdate({
        mobileNumber:req.body.mobileNumber
    },{$set:{isApproved:req.body.isApproved}}).then(user=>{
        res.send({
            response_code:200,
            response:"status updated successfully",
        })
    }).catch(err=>{
        return res.status(400).send({
            response_code:800,
            response:"error occured "+err.message
        })
    })
}

/*exports.updateUser=(req,res)=>{//for updating the user details
    //mobile and secretCode is required for this
    if(!req.body.mobileNumber){
        return res.status(400).send({
            response_code:801,
            response:"mobileNumber is missing"
        })
    }

    if(!req.body.securityNumebr){
        return res.status(400).send({
            response_code:801,
            response:"securityNumebr is missing"
        })
    }

    if()

}*/