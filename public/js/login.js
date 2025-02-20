const btn=document.getElementById("signupBtn");

btn.addEventListener("click",function(e){
    e.preventDefault();
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    fetch("/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    }).then(res=>{
        if(res.status===200){

            username.value="";
            password.value="";
            window.location.href="/workday";
        }else{
            res.json().then(data=>{
                alert(data.message);
            })
        }
    })
})