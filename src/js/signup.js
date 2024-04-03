
const signupButton = document.getElementById("signup-button");
console.log(signupButton)
const form = document.getElementById("signup-form");
signupButton.addEventListener('click', signup)

const errorDiv = document.getElementById("errors-container");
async function signup() {
    const formData = new FormData(form);
    console.log("send a post request to get log in token, write to local storage and , re-direct if successfull")
    try {
        const response = await fetch('http://localhost:3000/api/users/', {
            method: 'POST', 
            body: JSON.stringify(Object.fromEntries(formData)),
             headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            const data = await response.json()
            const errorList = document.createElement('ul')
            
            data.forEach(error => {
                const errorElem = document.createElement('li')
                errorElem.textContent = error.msg;
                errorList.appendChild(errorElem)
            });
            console.log(errorList)
            errorDiv.replaceChildren(errorList)
            return

        }else{
            window.location.href = '/login';
        }
    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}
