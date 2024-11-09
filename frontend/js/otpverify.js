document.getElementById('frm').addEventListener('submit',async function(e) {
    e.preventDefault();
    const email=localStorage.getItem("email")

     num1 = document.getElementById('digit1').value;
     num2 = document.getElementById('digit2').value;
     num3 = document.getElementById('digit3').value;
     num4 = document.getElementById('digit4').value;

    otp=num1+num2+num3+num4


     console.log(otp,email);
     
    const res=await fetch('http://localhost:3008/api/otpcheck',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({email,otp})
    })
if (res.status==201) {
    alert("otp verified successfully")

    window.location.href=`../pages/changepass.html`
}else{
    alert("otp didint match")
}

 
});