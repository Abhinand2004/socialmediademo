

async function getdata() {
    const token=localStorage.getItem("token")
      const res = await fetch("http://localhost:3008/api/display",{
        headers:{"authorization":`Bearer ${token}`}
      });
      const movie=await res.json();
      // console.log(movie);
      document.getElementById("profile-name").textContent=movie.user
    document.getElementById('profile-pic').src=movie.pic
     console.log(movie.post);
    
     if (token) {
      document.getElementById("loginn").style.display="none"
    
     }
     if(!(token)){
      document.getElementById("card").style.display="none"
      document.getElementById("profile-nav").style.display="none"
      alert("You Must Have To Login")
      window.location.href=`./pages/login.html`

     }
// console.log(length(movie.post));
let length = Object.keys(movie.post).length;


str=``

for(i=0;i<=length-1;i++){
  // console.log(i);
  
  const    asd=movie.post[i]
  // console.log(asd);
  
  // console.log(asd._id);
  // console.log(asd.images.length);
  str+=`
  <div class="card" id="card" onclick="change()">
  <a href="./pages/picdetails.html?id=${asd._id}">
  <div><h3 id="usrname">${asd.usrname}</h3></div>
  <div class="card-image" id="card-image">
  
  <img src="${asd.images[0]}" wid class="card-image" >
  </div>
  <div class="card-description" id="card-description">
  <p>${asd.description}</p>
  </div>
  </a>
  </div>
  
  `

  
 }


 document.getElementById("main").innerHTML=str

}

  
      
  
  getdata()


  function change(params) {
    window.location.href=``
  }