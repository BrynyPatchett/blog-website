console.log("Hello FROM HOMEPAGE")
const blogList = document.body.querySelector(".content");

async function getposts() {
    
    try {
        const response = await fetch('http://localhost:3000/api/posts/')
        if(!response.ok){
            throw Error(response.status)
        }
        const data = await response.json()
        data.forEach(blog => {
            const testpara = document.createElement('li')
            testpara.textContent = blog.title
            blogList.appendChild(testpara)
        });

    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}

getposts();