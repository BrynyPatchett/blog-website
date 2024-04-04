
const loginButton = document.getElementById("login-button");
const form = document.getElementById("login-form");
loginButton.addEventListener('click', login)
const errorDiv = document.getElementById("errors-container");
async function login() {
    const formData = new FormData(form);
        try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST', 
            body: JSON.stringify(Object.fromEntries(formData)),
             headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        if (!response.ok) {
            const errorList = document.createElement('ul')
            
            data.forEach(error => {
                const errorElem = document.createElement('li')
                errorElem.textContent = error.msg;
                errorList.appendChild(errorElem)
            });
            errorDiv.replaceChildren(errorList)
            throw Error();
        }
        localStorage.setItem('userToken',data.token)
        window.location.href = '/';
    }
    catch (err) {
        console.log("error: " + err)
    }
}
