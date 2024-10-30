let images=[];
const token=localStorage.getItem("token")


document.getElementById('frm').addEventListener('submit',async function (e) {
    e.preventDefault();

    description=document.getElementById('description').value,
 


    
    console.log("description");
    

    const res=await fetch('http://localhost:3008/api/addpost',{
        method:"POST",
        headers:{"content-Type":'application/json',"authorization":`Bearer ${token}`},
        body:JSON.stringify({description,images})
    })
    console.log(res);
    

    const data=await res.json()
    if(res.status==201){
        alert(data.msg)
  window.location.href="../pages/details.html"
       
    }
    else{
        alert(data.error)
    }

    
 });

 async function changed(){
     
   let files=document.getElementById("images").files

   for(file of files){
images.push(await convertBase64(file))
    
   }
   
   str=``
   images.map((img)=>{
    str+=`<img src="${img}">`
   })
   document.getElementById("imageDisplay").innerHTML=str
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
