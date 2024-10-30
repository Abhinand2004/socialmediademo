const url = window.location.href;
console.log(url);
const urlParams = new URLSearchParams(url.split("?")[1]);
console.log(urlParams);
const id = urlParams.get("id");
console.log(id);

async function getdata() {
    const res = await fetch(`http://localhost:3008/api/details/${id}`);
    const data = await res.json();
    console.log(data);

    
    document.querySelector('.profile-image').src = data.images[0];
    document.getElementById("usrname").innerHTML=data.usrname
  
    document.getElementById('description').textContent = data.description;

   
    let str = '';
    data.images.forEach((img) => {
        str += `
            <img src="${img}" alt="Small Image" class="small-image" style="width: 100px; height: 100px; border: 1px solid black; cursor: pointer;">
        `;
    });
    
    document.querySelector('.small-images').innerHTML = str;

   
    const smallImages = document.querySelectorAll('.small-image');
    smallImages.forEach((smallImg) => {
        smallImg.addEventListener('mouseover', () => {
            document.querySelector('.profile-image').src = smallImg.src;
        });
    });
}

getdata();
