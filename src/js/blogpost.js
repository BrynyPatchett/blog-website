console.log("Hello FROM BLOG !!!!!")
import '../styles/blog.css'

const search = new URLSearchParams(document.location.search)
console.log(search.get('id'))
const blogid = search.get('id');
const content = document.body.querySelector(".content");

async function getpost() {

    try {
        const [blogResponse,commentResponse] = await Promise.all([
            fetch(`http://localhost:3000/api/posts/${blogid}`),
            fetch(`http://localhost:3000/api/posts/${blogid}/comments`),
        ])

        if (!blogResponse.ok) {
            throw new Error();
        }
        const blog = await blogResponse.json()
        const blogItem = document.createElement('div')
        blogItem.classList.add('blog-full')
        const blogLink = document.createElement('div')
        const blogInfo = document.createElement('div')
        blogInfo.classList.add('blog-info')

        const blogTitle = document.createElement('h2')
        blogTitle.textContent = blog.title;

        const blogAuthor = document.createElement('p')
        blogAuthor.textContent = blog.author.username;

        const blogText = document.createElement('div')
        blogText.classList.add('blog-text-full')

        const blogContent = document.createElement('p')
        blogContent.textContent = blog.content;

        blogText.appendChild(blogContent)
        blogInfo.appendChild(blogTitle);
        blogInfo.appendChild(blogAuthor);
        blogLink.appendChild(blogInfo)
        blogLink.appendChild(blogText)
        blogItem.appendChild(blogLink)
        content.append(blogItem)

        if (!commentResponse.ok) {
            throw new Error();
        }
        const comments = await commentResponse.json()
        console.log(comments)

    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}

getpost();

