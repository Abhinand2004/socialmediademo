document.getElementById('frm').addEventListener('submit',async function (e) {
    e.preventDefault();

    username=document.getElementById('username').value,
    pass=document.getElementById('password').value
    
    


    
    
    

    const res=await fetch('http://localhost:3008/api/login',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({username,pass})
    })
    console.log(res);
    

    const data=await res.json()
    console.log(data);
    
    if(res.status==201){
        
        
        window.location.href="../index.html"
        console.log(data.token);
        localStorage.setItem('token',data.token)
        
        
    }
    else{
        alert(data.error)
    }

    
 });

 function  chaing() {
    window.location.href="./register.html"
    
  }

