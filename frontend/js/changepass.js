document.getElementById('frm').addEventListener('submit',async function(e) {
    e.preventDefault();
    const email=localStorage.getItem("email")

   pwd=document.getElementById("newPassword").value
   cpwd=document.getElementById("confirmPassword").value
    


     console.log(pwd,cpwd,email);
     
    const res=await fetch('http://localhost:3008/api/passcheck',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({email,pwd,cpwd})
    })
if (res.status==201) {
    alert("password updated successfully")
    localStorage.removeItem("email")


    window.location.href=`../pages/login.html`
}else{
    alert("password miss mached")
}

 
});