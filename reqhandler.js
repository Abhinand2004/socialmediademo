import userSchema from "./models/model1.js"
import postdata from "./models/postdata.js"
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import nodemailer from 'nodemailer'
const {sign}=pkg


const transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    // secure: false, // true for port 465, false for other ports
    auth: {
      user: "abhinandc293@gmail.com",
      pass: "xfrk uoxu ipfs lhjj",
    },
  });

export async function addUser(req,res) {
    // console.log(req.body);
    const{username,email,pwd,cpwd,phone,pic,otp}=req.body    
    if(!(username&&email&&pwd&&cpwd&&phone&&pic))
        return res.status(500).send({msg:"fields are empty"})
    if(pwd!=cpwd)
        return res.status(500).send({msg:"pass not match"})
    bcrypt.hash(pwd,10).then((hpwd)=>{        
        userSchema.create({username,email,pass:hpwd,phone,pic,otp})
        res.status(201).send({msg:"Successfull"})
    }).catch((error)=>{
        console.log(error);
    })
}

export async function login(req,res) {
    // console.log(req.body);
    const{username,pass}=req.body    
    if (!(username&&pass)) 
        return res.status(500).send({msg:"fields are empty"})
        const user= await userSchema.findOne({username})        
        
    if (!user) 
        return res.status(500).send({msg:"user donot exist"})
        const success= await bcrypt.compare(pass,user.pass)
        // console.log(success);
        if(success!==true)
            return res.status(500).send({msg:"user or password not exist"})
        const token= await sign ({UserID:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
        // console.log(token);
        
        res.status(201).send({token})

}


export async function display(req, res) {
    // console.log(req.user);
    const usr=await userSchema.findOne({_id:req.user.UserID})
    const post=await postdata.find()
    // console.log(usr);
    res.status(200).send({user:usr.username,pic:usr.pic,post,id:post._id}); 

   
}

export async function getuserdata(req,res) {
    const usr=await userSchema.findOne({_id:req.user.UserID})
    const post=await postdata.find({id:req.user.UserID})
    
    res.status(200).send({user:usr.username,email:usr.email,phone:usr.phone,pic:usr.pic,post,id:usr._id});  


}


export async function addpost(req,res) {
    // console.log(req.body);
    const{...datas}=req.body    
    const user = await userSchema.findById(req.user.UserID);
        await postdata.create({id:req.user.UserID,...datas,usrname:user.username}).then(()=>{
            res.status(201).send({msg:"succcessfull"})

        }).catch((error)=>{
            res.status(404).send({error:error})
        })
    }



export async function dltusr(req,res) {
    const {id}=req.params;
    const data= await userSchema.deleteOne({_id:id})
    .then(()=>{
        res.status(201).send({msg:"delete"})

    }).catch((error)=>{
        res.status(500).send({error})
    });
    
}


export async function editdata(req,res) {
    // console.log(req.params);
    const {id}=req.params;
    const data=await postdata.findOne({_id:id})
    // console.log(data);

    res.status(200).send(data)
    
    
}



export async function update(req,res) {
    // console.log(req.params);
    // console.log(req.body);
    const {...data}=req.body
    await postdata.updateOne({_id:req.params.id},{$set:{...data}}).then(()=>{
        res.status(201).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({error:error})
        
    })
    
    
    
}




export async function delpost(req,res) {
    const {id}=req.params;
    const data= await postdata.deleteOne({_id:id})
    .then(()=>{
        res.status(201).send({msg:"delete"})

    }).catch((error)=>{
        res.status(500).send({error})
    });
    
}

export async function generateOTP(req,res) {
    const {email}=req.body
    console.log(email);
    if (!(email))  {
        return res.status(500).send({msg:"fields are empty"})
    }
    
    const user= await userSchema.findOne({email})        
    
    if (user) {
        const otp=Math.floor(Math.random()*10000)
        console.log(otp);
        await userSchema.updateOne({email:email},{$set:{otp:otp}})
        const info = await transporter.sendMail({
            from: 'abhinandc293@gmail.com', // sender address
            to: email, // list of receivers
            subject: "OTP", // Subject line
            text: "VERIFY!", // plain text body
            html: `<b>OTP IS ${otp}</b>`, // html body
        })
        console.log("Message sent: %s", info.messageId)
        res.status(201).send({msg:"otp send"})
        
    }else{
        return res.status(500).send({msg:"emial donot exist"})
    }

}



export async function verifyotp(req,res) {
    // console.log(req.body);
    const{email,otp}=req.body    
    if (!(otp )) 
        return res.status(500).send({msg:"fields are empty"})
      try{
        const user = await userSchema.findOne({ email: email,otp:otp });
        
    if (!user) 
        return res.status(500).send({msg:"otp didint match"})
      
        res.status(201).send({msg:"successs"})
      }catch (error){
        return res.status(500).send({msg:"there are some issues with your email"})
        
      }
}






export async function updatepass(req,res) {
    
    const {pwd,cpwd,email}=req.body
    if(pwd!=cpwd)
        return res.status(500).send({msg:"pass not match"})
    bcrypt.hash(pwd,10).then(async(hpwd)=>{        
        await userSchema.updateOne({email:email},{$set:{pass:hpwd} })
        
        console.log("password updated");
        
        res.status(201).send({msg:"Successfull"})

        await userSchema.updateOne({email:email},{$set:{otp:null}})



    }).catch((error)=>{
        console.log(error);
    })
    
    
    
}