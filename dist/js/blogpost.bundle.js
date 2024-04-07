/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/blog.css":
/*!*****************************!*\
  !*** ./src/styles/blog.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/navbar.css":
/*!*******************************!*\
  !*** ./src/styles/navbar.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/account.js":
/*!***************************!*\
  !*** ./src/js/account.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jwtUser: () => (/* binding */ jwtUser),
/* harmony export */   logoutUser: () => (/* binding */ logoutUser),
/* harmony export */   user: () => (/* binding */ user)
/* harmony export */ });
const user = localStorage.getItem('userToken');

function logoutUser(){
    localStorage.removeItem('userToken');
    window.location.href = 'https://brynypatchett.github.io/blog-website/';
}

function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // loggedin user
  const jwtUser = parseJwt(user)

/***/ }),

/***/ "./src/js/blogpost.js":
/*!****************************!*\
  !*** ./src/js/blogpost.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account */ "./src/js/account.js");
/* harmony import */ var _styles_blog_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/blog.css */ "./src/styles/blog.css");


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
            fetch(`https://weak-honorable-degree.glitch.me/api/posts/${blogid}`),
            fetch(`https://weak-honorable-degree.glitch.me/api/posts/${blogid}/comments`)
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
            if(_account__WEBPACK_IMPORTED_MODULE_0__.jwtUser && (_account__WEBPACK_IMPORTED_MODULE_0__.jwtUser.sub === comment.user._id || _account__WEBPACK_IMPORTED_MODULE_0__.jwtUser.sub == blog.author._id)){

                const deleteButton = document.createElement('button')
                deleteButton.classList.add('deleteButton')
                deleteButton.textContent = "Delete";
                commentItem.appendChild(deleteButton)
                deleteButton.addEventListener("click",() => deleteComment(comment._id))
            }
            commentList.appendChild(commentItem)

        });

        content.append(commentList)
    }
    catch (err) {
        console.log("error: " + err)
    }
}

getpost();

async function createComment(){
    const formData = new FormData(form);
    try {
        const response = await fetch(`https://weak-honorable-degree.glitch.me/api/posts/${blogid}/comments/`, {
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
}


async function deleteComment(commentID){
    try {
        const response = await fetch(`https://weak-honorable-degree.glitch.me/api/posts/${blogid}/comments/${commentID}`, {
            method: 'DELETE', 
             headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
        if(!response.ok){
            return;
        }else{
            location.reload()
        } 
    }
    catch (err) {
        console.log("error: " + err)
    }
}

/***/ }),

/***/ "./src/js/navbar.js":
/*!**************************!*\
  !*** ./src/js/navbar.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_navbar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/navbar.css */ "./src/styles/navbar.css");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ "./src/js/account.js");


const currentPage = window.location.pathname;

const navbar = document.createElement('nav');
const accountDiv = document.createElement('div');
accountDiv.classList.add('accountDiv')

const home = document.createElement('a');
home.href = "/blog-website/";
home.textContent = "Home"
home.classList.add('home')
home.classList.add('navItem')

if (_account__WEBPACK_IMPORTED_MODULE_1__.user) {
    const logout = document.createElement('div');
    logout.textContent = "Log Out"
    logout.classList.add('navItem')
    accountDiv.appendChild(logout)
    logout.onclick = _account__WEBPACK_IMPORTED_MODULE_1__.logoutUser;

} else {
    const login = document.createElement('a');
    login.href = "https://brynypatchett.github.io/blog-website/login";
    login.textContent = "Log In"
    login.classList.add('navItem')

    const signup = document.createElement('a');
    signup.href = "https://brynypatchett.github.io/blog-website/signup";
    signup.textContent = "Sign up"
    signup.classList.add('navItem')

    if (login.pathname === currentPage) {
        login.classList.add('active')
    }
    if (signup.pathname === currentPage) {
        signup.classList.add('active')
    }

    accountDiv.appendChild(signup)
    accountDiv.appendChild(login)
}

if (home.pathname === currentPage) {
    // console.log("singup")
    home.classList.add('active')
}

navbar.appendChild(home)
navbar.appendChild(accountDiv);
navbar.classList.add('navbar')
document.body.prepend(navbar)





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./src/js/blogpost.js");
/******/ 	__webpack_require__("./src/js/navbar.js");
/******/ 	__webpack_require__("./src/styles/index.css");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/blog.css");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYmxvZ3Bvc3QuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBUzs7Ozs7Ozs7Ozs7OztBQ2pCMkI7QUFDVDtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUVBQXVFLE9BQU87QUFDOUUsdUVBQXVFLE9BQU87QUFDOUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLGVBQWUsNkNBQU8sS0FBSyw2Q0FBTyw2QkFBNkIsNkNBQU87O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBGQUEwRixPQUFPO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLDBGQUEwRixPQUFPLFlBQVksVUFBVTtBQUN2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsSjZCO0FBQ2U7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSwwQ0FBSTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdEQUFVOztBQUUvQixFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztVQ25EQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9zdHlsZXMvYmxvZy5jc3M/ZGIyZiIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz80ZTQyIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9zdHlsZXMvbmF2YmFyLmNzcz82ZjZlIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9qcy9hY2NvdW50LmpzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9qcy9ibG9ncG9zdC5qcyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvanMvbmF2YmFyLmpzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgY29uc3QgdXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyVG9rZW4nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ291dFVzZXIoKXtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlclRva2VuJyk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly9icnlueXBhdGNoZXR0LmdpdGh1Yi5pby9ibG9nLXdlYnNpdGUvJztcbn1cblxuZnVuY3Rpb24gcGFyc2VKd3QodG9rZW4pIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KFwiLlwiKVsxXTtcbiAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZShcIi1cIiwgXCIrXCIpLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYihiYXNlNjQpKTtcbiAgfVxuXG4gIC8vIGxvZ2dlZGluIHVzZXJcbiAgZXhwb3J0IGNvbnN0IGp3dFVzZXIgPSBwYXJzZUp3dCh1c2VyKSIsImltcG9ydCB7IGp3dFVzZXIgfSBmcm9tICcuL2FjY291bnQnO1xuaW1wb3J0ICcuLi9zdHlsZXMvYmxvZy5jc3MnXG5jb25zdCBjb21tZW50QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50LWJ1dHRvblwiKTtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnQtZm9ybVwiKTtcbmNvbnN0IHNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoZG9jdW1lbnQubG9jYXRpb24uc2VhcmNoKVxuY29tbWVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZUNvbW1lbnQpXG5jb25zdCBlcnJvckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JzLWNvbnRhaW5lclwiKTtcbmNvbnN0IGJsb2dpZCA9IHNlYXJjaC5nZXQoJ2lkJyk7XG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldHBvc3QoKSB7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBbYmxvZ1Jlc3BvbnNlLGNvbW1lbnRSZXNwb25zZV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS9wb3N0cy8ke2Jsb2dpZH1gKSxcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL3dlYWstaG9ub3JhYmxlLWRlZ3JlZS5nbGl0Y2gubWUvYXBpL3Bvc3RzLyR7YmxvZ2lkfS9jb21tZW50c2ApXG4gICAgICAgIF0pXG5cbiAgICAgICAgaWYgKCFibG9nUmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJsb2cgPSBhd2FpdCBibG9nUmVzcG9uc2UuanNvbigpXG4gICAgICAgIGNvbnN0IGJsb2dJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgYmxvZ0l0ZW0uY2xhc3NMaXN0LmFkZCgnYmxvZy1mdWxsJylcbiAgICAgICAgY29uc3QgYmxvZ0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBjb25zdCBibG9nSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGJsb2dJbmZvLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctaW5mbycpXG5cbiAgICAgICAgY29uc3QgYmxvZ1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxuICAgICAgICBibG9nVGl0bGUudGV4dENvbnRlbnQgPSBibG9nLnRpdGxlO1xuXG4gICAgICAgIGNvbnN0IGJsb2dBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgYmxvZ0F1dGhvci50ZXh0Q29udGVudCA9IGJsb2cuYXV0aG9yLnVzZXJuYW1lO1xuXG4gICAgICAgIGNvbnN0IGJsb2dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgYmxvZ1RleHQuY2xhc3NMaXN0LmFkZCgnYmxvZy10ZXh0LWZ1bGwnKVxuXG4gICAgICAgIGNvbnN0IGJsb2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgIGJsb2dDb250ZW50LnRleHRDb250ZW50ID0gYmxvZy5jb250ZW50O1xuXG4gICAgICAgIGJsb2dUZXh0LmFwcGVuZENoaWxkKGJsb2dDb250ZW50KVxuICAgICAgICBibG9nSW5mby5hcHBlbmRDaGlsZChibG9nVGl0bGUpO1xuICAgICAgICBibG9nSW5mby5hcHBlbmRDaGlsZChibG9nQXV0aG9yKTtcbiAgICAgICAgYmxvZ0xpbmsuYXBwZW5kQ2hpbGQoYmxvZ0luZm8pXG4gICAgICAgIGJsb2dMaW5rLmFwcGVuZENoaWxkKGJsb2dUZXh0KVxuICAgICAgICBibG9nSXRlbS5hcHBlbmRDaGlsZChibG9nTGluaylcbiAgICAgICAgY29udGVudC5wcmVwZW5kKGJsb2dJdGVtKVxuXG4gICAgICAgIGlmICghY29tbWVudFJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgY29tbWVudFJlc3BvbnNlLmpzb24oKVxuICAgICAgICBjb25zdCBjb21tZW50TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbW1lbnRMaXN0LmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRMaXN0JylcbiAgICAgICAgY29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbW1lbnRJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnQnKVxuXG4gICAgICAgICAgICBjb25zdCBjb21tZW50SW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb21tZW50SW5mby5jbGFzc0xpc3QuYWRkKCdjb21tZW50SW5mbycpXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpXG4gICAgICAgICAgICBjb21tZW50QXV0aG9yLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRBdXRob3InKVxuICAgICAgICAgICAgY29tbWVudEF1dGhvci50ZXh0Q29udGVudCA9IGNvbW1lbnQudXNlci51c2VybmFtZVxuXG4gICAgICAgICAgICBjb25zdCBjb21tZW50Q29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgICAgICAgY29tbWVudENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29tbWVudENvbnRlbnQnKVxuICAgICAgICAgICAgY29tbWVudENvbnRlbnQudGV4dENvbnRlbnQgPSBjb21tZW50LmNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgICAgICBjb21tZW50RGF0ZS5jbGFzc0xpc3QuYWRkKCdjb21tZW50RGF0ZScpXG4gICAgICAgICAgICBjb21tZW50RGF0ZS50ZXh0Q29udGVudCA9IGNvbW1lbnQuZGF0ZTtcbiAgICAgICAgICAgIGNvbW1lbnRJbmZvLmFwcGVuZENoaWxkKGNvbW1lbnRBdXRob3IpXG4gICAgICAgICAgICBjb21tZW50SW5mby5hcHBlbmRDaGlsZChjb21tZW50RGF0ZSlcbiAgICAgICAgICAgIGNvbW1lbnRJdGVtLmFwcGVuZENoaWxkKGNvbW1lbnRJbmZvKVxuXG5cbiAgICAgICAgICAgIGNvbW1lbnRJdGVtLmFwcGVuZENoaWxkKGNvbW1lbnRDb250ZW50KVxuICAgICAgICAgICAgaWYoand0VXNlciAmJiAoand0VXNlci5zdWIgPT09IGNvbW1lbnQudXNlci5faWQgfHwgand0VXNlci5zdWIgPT0gYmxvZy5hdXRob3IuX2lkKSl7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGVCdXR0b24nKVxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRGVsZXRlXCI7XG4gICAgICAgICAgICAgICAgY29tbWVudEl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKVxuICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoKSA9PiBkZWxldGVDb21tZW50KGNvbW1lbnQuX2lkKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbW1lbnRMaXN0LmFwcGVuZENoaWxkKGNvbW1lbnRJdGVtKVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kKGNvbW1lbnRMaXN0KVxuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyKVxuICAgIH1cbn1cblxuZ2V0cG9zdCgpO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDb21tZW50KCl7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS9wb3N0cy8ke2Jsb2dpZH0vY29tbWVudHMvYCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsIFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhKSksXG4gICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJUb2tlbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKCFyZXNwb25zZS5vayl7XG4gICAgICAgICAgICBjb25zdCBlcnJvckxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG4gICAgICAgICAgICBjb25zdCBlcnJvckVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICBlcnJvckVsZW0udGV4dENvbnRlbnQgPSBcIlVzZXIgaXMgbm90IExvZ2dlZCBpblwiXG4gICAgICAgICAgICBlcnJvckxpc3QuYXBwZW5kQ2hpbGQoZXJyb3JFbGVtKVxuICAgICAgICAgICAgZXJyb3JEaXYucmVwbGFjZUNoaWxkcmVuKGVycm9yTGlzdClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICB9IFxuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyKVxuICAgIH1cbn1cblxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVDb21tZW50KGNvbW1lbnRJRCl7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS9wb3N0cy8ke2Jsb2dpZH0vY29tbWVudHMvJHtjb21tZW50SUR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJywgXG4gICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJUb2tlbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKCFyZXNwb25zZS5vayl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgfSBcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycilcbiAgICB9XG59IiwiaW1wb3J0ICcuLi9zdHlsZXMvbmF2YmFyLmNzcydcbmltcG9ydCB7IHVzZXIsbG9nb3V0VXNlciB9IGZyb20gXCIuL2FjY291bnRcIjtcbmNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG5jb25zdCBuYXZiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbmNvbnN0IGFjY291bnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmFjY291bnREaXYuY2xhc3NMaXN0LmFkZCgnYWNjb3VudERpdicpXG5cbmNvbnN0IGhvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5ob21lLmhyZWYgPSBcIi9ibG9nLXdlYnNpdGUvXCI7XG5ob21lLnRleHRDb250ZW50ID0gXCJIb21lXCJcbmhvbWUuY2xhc3NMaXN0LmFkZCgnaG9tZScpXG5ob21lLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuXG5pZiAodXNlcikge1xuICAgIGNvbnN0IGxvZ291dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxvZ291dC50ZXh0Q29udGVudCA9IFwiTG9nIE91dFwiXG4gICAgbG9nb3V0LmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuICAgIGFjY291bnREaXYuYXBwZW5kQ2hpbGQobG9nb3V0KVxuICAgIGxvZ291dC5vbmNsaWNrID0gbG9nb3V0VXNlcjtcblxufSBlbHNlIHtcbiAgICBjb25zdCBsb2dpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsb2dpbi5ocmVmID0gXCJodHRwczovL2JyeW55cGF0Y2hldHQuZ2l0aHViLmlvL2Jsb2ctd2Vic2l0ZS9sb2dpblwiO1xuICAgIGxvZ2luLnRleHRDb250ZW50ID0gXCJMb2cgSW5cIlxuICAgIGxvZ2luLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuXG4gICAgY29uc3Qgc2lnbnVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHNpZ251cC5ocmVmID0gXCJodHRwczovL2JyeW55cGF0Y2hldHQuZ2l0aHViLmlvL2Jsb2ctd2Vic2l0ZS9zaWdudXBcIjtcbiAgICBzaWdudXAudGV4dENvbnRlbnQgPSBcIlNpZ24gdXBcIlxuICAgIHNpZ251cC5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcblxuICAgIGlmIChsb2dpbi5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgbG9naW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICB9XG4gICAgaWYgKHNpZ251cC5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgc2lnbnVwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChzaWdudXApXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChsb2dpbilcbn1cblxuaWYgKGhvbWUucGF0aG5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzaW5ndXBcIilcbiAgICBob21lLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG59XG5cbm5hdmJhci5hcHBlbmRDaGlsZChob21lKVxubmF2YmFyLmFwcGVuZENoaWxkKGFjY291bnREaXYpO1xubmF2YmFyLmNsYXNzTGlzdC5hZGQoJ25hdmJhcicpXG5kb2N1bWVudC5ib2R5LnByZXBlbmQobmF2YmFyKVxuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9ibG9ncG9zdC5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9uYXZiYXIuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2luZGV4LmNzc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmxvZy5jc3NcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=