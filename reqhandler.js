import userSchema from "./models/model1.js"
import postdata from "./models/postdata.js"
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign}=pkg


export async function addUser(req,res) {
    // console.log(req.body);
    const{username,email,pwd,cpwd,phone,pic}=req.body    
    if(!(username&&email&&pwd&&cpwd&&phone&&pic))
        return res.status(500).send({msg:"fields are empty"})
    if(pwd!=cpwd)
        return res.status(500).send({msg:"pass not match"})
    bcrypt.hash(pwd,10).then((hpwd)=>{        
        userSchema.create({username,email,pass:hpwd,phone,pic})
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
    console.log(req.body);
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
    console.log(data);

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