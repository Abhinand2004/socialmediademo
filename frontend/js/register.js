let pic;



document.getElementById('frm').addEventListener('submit',async function (e) {
    e.preventDefault();

    username=document.getElementById('username').value,
    email=document.getElementById('email').value,
    phone=document.getElementById('phone').value,

    pwd=document.getElementById('password').value,
    cpwd=document.getElementById('confirm-password').value,


    
    console.log(username,email,pwd,cpwd,pic);
    

    const res=await fetch('http://localhost:3008/api/addUser',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({username,email,pwd,cpwd,pic,phone})
    })
    console.log(res);
    

    const data=await res.json()
    if(res.status==201){
        alert(data.msg)
        window.location.href="./login.html"
    }
    else{
        alert(data.error)
    }

    
 });
 async function picture() {
    const file=document.getElementById("pic").files[0]
      pic=await convertBase64(file)
    console.log(pic);
    document.getElementById('img').src=pic
    
     }

 function convertBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();

        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
            resolve(fileReader.result)

        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
 }
