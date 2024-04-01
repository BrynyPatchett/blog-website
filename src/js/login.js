
const loginButton = document.getElementById("login-button");
const form = document.getElementById("login-form");
loginButton.addEventListener('click',login)
function login(){
    const formData = new FormData(form);
    console.log(form)
     console.log(formData)
    console.log("send a post request to get log in token, write to local storage and , re-direct if successfull")
//     fetch('http://localhost:8080/', {
//   method: 'POST',
//   body: formData
// }).then((response) => { 
//     // do something with response here... 
//   });
}
