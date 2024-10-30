const url = window.location.href;
console.log(url);
const urlParams = new URLSearchParams(url.split("?")[1]);
console.log(urlParams);
const id=urlParams.get("id");
console.log(id);


async function getdata() {
  const res = await fetch(`http://localhost:3008/api/details/${id}`);
  const data = await res.json();
  console.log(data);
  document.getElementById('description').value = data.description;

  // Set the main image initially (assuming the first image is the main one)
  document.querySelector('.card-image img').src = data.images[0];

  let str = '';
  data.images.forEach((img) => {
      str += `
          <img src="${img}" alt="Small Image" class="small-image" style="cursor: pointer;">
      `;
  });
  
  document.getElementById("small-images").innerHTML = str;

  // Add hover event listeners to small images
  const smallImages = document.querySelectorAll('.small-image');
  smallImages.forEach((smallImg) => {
      smallImg.addEventListener('mouseover', () => {
          document.querySelector('.card-image img').src = smallImg.src;
      });
  });
}

getdata();




document.getElementById('frm').addEventListener('submit',async function (e) {
    e.preventDefault();

  description=  document.getElementById('description').value
    console.log(id);
    
    const res= await fetch(`http://localhost:3008/api/update/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({description})
    });
    
      
    const data=await res.json()
    if(res.status==201){
        alert(data.msg)
        window.location.href=`../index.html`
    }
    else{
        alert(data.error)
    }
})




function del(){
    fetch(`http://localhost:3008/api/deletepost/${id}`,{
      method:"DELETE",headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
    if(res.status==201){
      alert("success")
      window.location.href="../index.html"
    }else{
      alert("error")
    }
    })
    }
    