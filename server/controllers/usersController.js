const bcrypt=require("bcryptjs");
const User= require("../models/user");
const jwt=require("jsonwebtoken");

 async function signup(req,res){
    try{
    const{email,password}=req.body;

    const HashedPassword=bcrypt.hashSync(password,8);
    await User.create({email,password:HashedPassword});
    res.sendStatus(200);
    }catch(err){
        console.log(err);
    res.sendStatus(400);
    }


}

 async function login(req,res){
    try{
    //get the email and password off rq body
const {email,password}=req.body;

    //find the user with requested email
 const user=await User.findOne({email});
 if(!user) return res.sendStatus(401);
    //compare sent in password with dfound user password
const passwordMatch=bcrypt.compareSync(password,user.password);
if(!passwordMatch) return res.sendStatus(401);

    //create jwt token
    const exp=Date.now()+1000*60*60*24*30;
const token =jwt.sign({sub:user._id,exp:exp},process.env.SECRET);

//set the cookie
res.cookie("Authorization",token,{
    expires:new Date(exp),
    httpOnly:true,
    sameSite:'lax',
    secure:process.env.NODE_ENV==="production",
})

    //send it
    res.sendStatus(200);
}catch(err){
    console.log(err);
    res.sendStatus(400);
}
}

function logout(req,res){
    try{
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch(err){
        console.log(err);
        res.sendStatus(400);
    }
   
}
function checkAuth(req,res){
    console.log(req.user);
    res.sendStatus(200);
}
module.exports={
    signup,
    login,
    logout,
    checkAuth,
};