let id;


let asd;
async function getuserdata() {
    const token=localStorage.getItem("token")
      const res = await fetch("http://localhost:3008/api/getuserdata",{
        headers:{"authorization":`Bearer ${token}`}
      });
      const data=await res.json();
      // console.log(data.id);
      
      
      id=data.id
      document.getElementById("item1").textContent=data.user
      document.getElementById("item2").textContent=data.email
      document.getElementById("item3").textContent=data.phone
    document.getElementById('profile-pic').src=data.pic

     

      // console.log(data.post[0].images[0]);
      let length = Object.keys(data.post).length;
      // console.log(length);
// console.log(data.post);

      
      str=``
      for(i=0;i<=length-1;i++){
    asd=data.post[i]
console.log(asd._id);

str+=`

<div class="icon"><img src="${asd.images[0]}" alt="" id="abc" style="width: 100%; height: 100%;" onclick="change('${asd._id}')" ></div>
`
  



  





}
document.getElementById("icon-grid").innerHTML=str
  // console.log(asd);
  
       
  }

  getuserdata()

  function logout() {
    localStorage.removeItem('token');
    alert("You Loged Out")
    window.location.href="../index.html"

  }
  function delet(){
    fetch(`http://localhost:3008/api/delete/${id}`,{
      method:"DELETE",headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
    if(res.status==201){
      alert("success")
      localStorage.removeItem("token")
      window.location.href="../index.html"
    }else{
      alert("error")
    }
    })
    }

    function change(id){
      window.location.href=`../pages/edit.html?id=${id}`
    }
  

function home() {
  window.location.href=`../index.html`
}

