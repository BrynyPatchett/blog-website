
const signupButton = document.getElementById("signup-button");
console.log(signupButton)
const form = document.getElementById("signup-form");
signupButton.addEventListener('click', signup)
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
        if (!response.ok) {
            throw Error(response.status)
        }
        const data = await response.json()
    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}
