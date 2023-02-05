// save,user=>email,-> welcome -> (web)
const UserSchema= require('../model/User');
const registerUser=(req,resp)=>{
    const user = new UserSchema({
       fullName:req.body.fullName,
       email:req.body.email,
       password:req.body.password
    });
    user.save().then(result=>{
       let responseObject={
           message:'user created',
           email:result.email,
           token:'token'
       }
        resp.status(201).json(responseObject);
    }).catch(error=>{
        resp.status(500).json(error);
    })
}