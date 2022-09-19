const logform = document.getElementById("logform");
const name = document.getElementById("name");
const password = document.getElementById("password");
const errorElement = document.getElementById("error");

loginUser()
function loginUser(){


logform.addEventListener("submit", (e) => {
  e.preventDefault()
  let messages = []
  if (password.value.length <= 6) {
    messages.push("Password must be longer than 6 characters");
  }
  if (password.value.length >= 20) {
    messages.push("Password must be less than 20 characters");
  } else {
    
    fetch(
      `https://localhost:7171/api/Auth?username=${e.target.name.value}&password=${e.target.password.value}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          messages.push(result.error);
          errorElement.innerHTML = messages.join(", ")
         
        } else  {
          console.log("succes");
          window.location.href="main.html";
          console.log("respons" )
          console.log(result.id)
          localStorage.setItem('userId', result.id); 
          localStorage.setItem('userName', result.userName); 
          localStorage.setItem('userEmail', result.email); 
        }
      })
      .catch((error) => console.log(result.error));
  }
  errorElement.innerHTML = messages.join(", ")
});
}

//i sia funkcija ideti If
// if all users name egsistuoja arba email, tada ismeta error
//paduoti galima per pati eventa su e.name.valuo /e.password.value

// function fetchApiGet() {
//   debugger;
//   //const name = document.getElementById("name");
//   let messages = [];
//   //if(e.target.name.value==)
//   fetch(`https://localhost:7171/api/Auth?username=${name.value}&password=${password.value}`)
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.error) {
//         messages.push("Incorrect password or user nama" + result.error);
//       } else {
//         return response.json();
//         alert("Sucess");
//         console.log(response.json());
//       }
//     })
//     //.then(console.log(json()))
//     .catch((error) => console.error(error));
//   errorElement.innerHTML = messages.join(", ");
// }
