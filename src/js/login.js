
const loginButton = document.getElementById("login-button");
const form = document.getElementById("login-form");
loginButton.addEventListener('click', login)
async function login() {
    const formData = new FormData(form);
    console.log("send a post request to get log in token, write to local storage and , re-direct if successfull")
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
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
        localStorage.setItem('userToken',data.token)
        window.location.href = '/';
    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}
