import { jwtUser } from './account';
import '../styles/blog.css'
const commentButton = document.getElementById("comment-button");
const form = document.getElementById("comment-form");
const search = new URLSearchParams(document.location.search)
commentButton.addEventListener('click', createComment)
const errorDiv = document.getElementById("errors-container");
const blogid = search.get('id');
const content = document.body.querySelector(".content");

async function getpost() {

    try {
        const [blogResponse,commentResponse] = await Promise.all([
            fetch(`http://localhost:3000/api/posts/${blogid}`,),
            fetch(`http://localhost:3000/api/posts/${blogid}/comments`)
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
        content.prepend(blogItem)

        if (!commentResponse.ok) {
            throw new Error();
        }

        const comments = await commentResponse.json()
        const commentList = document.createElement('div')
        commentList.classList.add('commentList')
        comments.forEach(comment => {
            console.log(comment)
            const commentItem = document.createElement('div')
            commentItem.classList.add('comment')

            const commentInfo = document.createElement('div')
            commentInfo.classList.add('commentInfo')

            const commentAuthor = document.createElement('h4')
            commentAuthor.classList.add('commentAuthor')
            commentAuthor.textContent = comment.user.username

            const commentContent = document.createElement('p')
            commentContent.classList.add('commentContent')
            commentContent.textContent = comment.content;

            const commentDate = document.createElement('p')
            commentDate.classList.add('commentDate')
            commentDate.textContent = comment.date;
            commentInfo.appendChild(commentAuthor)
            commentInfo.appendChild(commentDate)
            commentItem.appendChild(commentInfo)


            commentItem.appendChild(commentContent)
            if(jwtUser.sub === comment.user._id || jwtUser.sub == blog.author._id){

                const deleteButton = document.createElement('button')
                deleteButton.classList.add('deleteButton')
                deleteButton.textContent = "Delete";
                commentItem.appendChild(deleteButton)
            }
            commentList.appendChild(commentItem)

        });

        content.append(commentList)


    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}

getpost();

async function createComment(){
    const formData = new FormData(form);
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${blogid}/comments/`, {
            method: 'POST', 
            body: JSON.stringify(Object.fromEntries(formData)),
             headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
        if(!response.ok){
            const errorList = document.createElement('ul')
            const errorElem = document.createElement('li')
            errorElem.textContent = "User is not Logged in"
            errorList.appendChild(errorElem)
            errorDiv.replaceChildren(errorList)
            return;
        }else{
            location.reload()
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
    console.log("done")
}
