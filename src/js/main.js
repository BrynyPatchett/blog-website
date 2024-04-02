console.log("Hello FROM HOMEPAGE")
import '../styles/blog.css'
const content = document.body.querySelector(".content");

async function getposts() {

    try {
        const response = await fetch('http://localhost:3000/api/posts/')
        if (!response.ok) {
            throw Error(response.status)
        }
        const data = await response.json()
        const blogList = document.createElement('div')
        blogList.classList.add('blog-list')
        data.forEach(blog => {
            console.log(blog)
            const blogItem = document.createElement('div')
            blogItem.classList.add('blog')
            const blogLink = document.createElement('a')
            blogLink.classList.add('blog-link')
            blogLink.href = `/blog?id=${blog._id}`;
            const blogInfo = document.createElement('div')
            blogInfo.classList.add('blog-info')

            const blogTitle = document.createElement('h2')
            blogTitle.textContent = blog.title;

            const blogAuthor = document.createElement('p')
            blogAuthor.textContent = blog.author.username;

            const blogText = document.createElement('div')
            blogText.classList.add('blog-text')

            const blogContent = document.createElement('p')
            blogContent.textContent = blog.content;

            blogText.appendChild(blogContent)
            blogInfo.appendChild(blogTitle);
            blogInfo.appendChild(blogAuthor);
            blogLink.appendChild(blogInfo)
            blogLink.appendChild(blogText)
            blogItem.appendChild(blogLink)
            blogList.appendChild(blogItem)

        });
        console.log(blogList)
        content.appendChild(blogList)
    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}

getposts();