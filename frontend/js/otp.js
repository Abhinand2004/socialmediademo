document.getElementById('email-form').addEventListener('submit',async function(e) {
    e.preventDefault();

     email = document.getElementById('email').value;
     console.log(email);
     
    const res=await fetch('http://localhost:3008/api/otp',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({email})
    })
if (res.status==201) {
    alert("otp send successfully")
    
}else{
    alert("faild to send OTP")
}

 
});