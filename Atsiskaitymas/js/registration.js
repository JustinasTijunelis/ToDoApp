const regform = document.getElementById('form')
const name = document.getElementById('name')
const password = document.getElementById('password')
const email = document.getElementById('email')
const errorElement = document.getElementById('error')

regform.addEventListener('submit', (e)=>{
    e.preventDefault()
    let messages = []
    if (password.value.length <= 6){
     messages.push('Password must be longer than 6 characters')
    }
    if(password.value.length >= 20){
     messages.push('Password must be less than 20 characters')
    }
    else{
            fetch(`https://localhost:7171/api/Auth`, {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify({
                "userName": e.target.name.value,
                "password": e.target.password.value,
                "email": e.target.email.value
            })
            })
        
        alert("Successful registration !! Please LogIn")
    }
     errorElement.innerHTML=messages.join(', ')
     window.location.href = "../html/login.html";
 })


