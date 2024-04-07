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
    window.location.href = '/blog-website/';
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
    login.href = "/blog-website/login";
    login.textContent = "Log In"
    login.classList.add('navItem')

    const signup = document.createElement('a');
    signup.href = "/blog-website/signup";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYmxvZ3Bvc3QuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBUzs7Ozs7Ozs7Ozs7OztBQ2pCMkI7QUFDVDtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUVBQXVFLE9BQU87QUFDOUUsdUVBQXVFLE9BQU87QUFDOUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLGVBQWUsNkNBQU8sS0FBSyw2Q0FBTyw2QkFBNkIsNkNBQU87O0FBRXRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBGQUEwRixPQUFPO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLDBGQUEwRixPQUFPLFlBQVksVUFBVTtBQUN2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsSjZCO0FBQ2U7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSwwQ0FBSTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdEQUFVOztBQUUvQixFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztVQ25EQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9zdHlsZXMvYmxvZy5jc3M/ZGIyZiIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz80ZTQyIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9zdHlsZXMvbmF2YmFyLmNzcz82ZjZlIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9qcy9hY2NvdW50LmpzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9qcy9ibG9ncG9zdC5qcyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvanMvbmF2YmFyLmpzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgY29uc3QgdXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyVG9rZW4nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ291dFVzZXIoKXtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlclRva2VuJyk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Jsb2ctd2Vic2l0ZS8nO1xufVxuXG5mdW5jdGlvbiBwYXJzZUp3dCh0b2tlbikge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoXCIuXCIpWzFdO1xuICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKFwiLVwiLCBcIitcIikucmVwbGFjZShcIl9cIiwgXCIvXCIpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKGJhc2U2NCkpO1xuICB9XG5cbiAgLy8gbG9nZ2VkaW4gdXNlclxuICBleHBvcnQgY29uc3Qgand0VXNlciA9IHBhcnNlSnd0KHVzZXIpIiwiaW1wb3J0IHsgand0VXNlciB9IGZyb20gJy4vYWNjb3VudCc7XG5pbXBvcnQgJy4uL3N0eWxlcy9ibG9nLmNzcydcbmNvbnN0IGNvbW1lbnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnQtYnV0dG9uXCIpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudC1mb3JtXCIpO1xuY29uc3Qgc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2gpXG5jb21tZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlQ29tbWVudClcbmNvbnN0IGVycm9yRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvcnMtY29udGFpbmVyXCIpO1xuY29uc3QgYmxvZ2lkID0gc2VhcmNoLmdldCgnaWQnKTtcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0cG9zdCgpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFtibG9nUmVzcG9uc2UsY29tbWVudFJlc3BvbnNlXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIGZldGNoKGBodHRwczovL3dlYWstaG9ub3JhYmxlLWRlZ3JlZS5nbGl0Y2gubWUvYXBpL3Bvc3RzLyR7YmxvZ2lkfWApLFxuICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vd2Vhay1ob25vcmFibGUtZGVncmVlLmdsaXRjaC5tZS9hcGkvcG9zdHMvJHtibG9naWR9L2NvbW1lbnRzYClcbiAgICAgICAgXSlcblxuICAgICAgICBpZiAoIWJsb2dSZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmxvZyA9IGF3YWl0IGJsb2dSZXNwb25zZS5qc29uKClcbiAgICAgICAgY29uc3QgYmxvZ0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBibG9nSXRlbS5jbGFzc0xpc3QuYWRkKCdibG9nLWZ1bGwnKVxuICAgICAgICBjb25zdCBibG9nTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IGJsb2dJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgYmxvZ0luZm8uY2xhc3NMaXN0LmFkZCgnYmxvZy1pbmZvJylcblxuICAgICAgICBjb25zdCBibG9nVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgICAgIGJsb2dUaXRsZS50ZXh0Q29udGVudCA9IGJsb2cudGl0bGU7XG5cbiAgICAgICAgY29uc3QgYmxvZ0F1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgICAgICBibG9nQXV0aG9yLnRleHRDb250ZW50ID0gYmxvZy5hdXRob3IudXNlcm5hbWU7XG5cbiAgICAgICAgY29uc3QgYmxvZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBibG9nVGV4dC5jbGFzc0xpc3QuYWRkKCdibG9nLXRleHQtZnVsbCcpXG5cbiAgICAgICAgY29uc3QgYmxvZ0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgYmxvZ0NvbnRlbnQudGV4dENvbnRlbnQgPSBibG9nLmNvbnRlbnQ7XG5cbiAgICAgICAgYmxvZ1RleHQuYXBwZW5kQ2hpbGQoYmxvZ0NvbnRlbnQpXG4gICAgICAgIGJsb2dJbmZvLmFwcGVuZENoaWxkKGJsb2dUaXRsZSk7XG4gICAgICAgIGJsb2dJbmZvLmFwcGVuZENoaWxkKGJsb2dBdXRob3IpO1xuICAgICAgICBibG9nTGluay5hcHBlbmRDaGlsZChibG9nSW5mbylcbiAgICAgICAgYmxvZ0xpbmsuYXBwZW5kQ2hpbGQoYmxvZ1RleHQpXG4gICAgICAgIGJsb2dJdGVtLmFwcGVuZENoaWxkKGJsb2dMaW5rKVxuICAgICAgICBjb250ZW50LnByZXBlbmQoYmxvZ0l0ZW0pXG5cbiAgICAgICAgaWYgKCFjb21tZW50UmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBjb21tZW50UmVzcG9uc2UuanNvbigpXG4gICAgICAgIGNvbnN0IGNvbW1lbnRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29tbWVudExpc3QuY2xhc3NMaXN0LmFkZCgnY29tbWVudExpc3QnKVxuICAgICAgICBjb21tZW50cy5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tbWVudEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29tbWVudEl0ZW0uY2xhc3NMaXN0LmFkZCgnY29tbWVudCcpXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbW1lbnRJbmZvLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRJbmZvJylcblxuICAgICAgICAgICAgY29uc3QgY29tbWVudEF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0JylcbiAgICAgICAgICAgIGNvbW1lbnRBdXRob3IuY2xhc3NMaXN0LmFkZCgnY29tbWVudEF1dGhvcicpXG4gICAgICAgICAgICBjb21tZW50QXV0aG9yLnRleHRDb250ZW50ID0gY29tbWVudC51c2VyLnVzZXJuYW1lXG5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgICAgICBjb21tZW50Q29udGVudC5jbGFzc0xpc3QuYWRkKCdjb21tZW50Q29udGVudCcpXG4gICAgICAgICAgICBjb21tZW50Q29udGVudC50ZXh0Q29udGVudCA9IGNvbW1lbnQuY29udGVudDtcblxuICAgICAgICAgICAgY29uc3QgY29tbWVudERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgICAgIGNvbW1lbnREYXRlLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnREYXRlJylcbiAgICAgICAgICAgIGNvbW1lbnREYXRlLnRleHRDb250ZW50ID0gY29tbWVudC5kYXRlO1xuICAgICAgICAgICAgY29tbWVudEluZm8uYXBwZW5kQ2hpbGQoY29tbWVudEF1dGhvcilcbiAgICAgICAgICAgIGNvbW1lbnRJbmZvLmFwcGVuZENoaWxkKGNvbW1lbnREYXRlKVxuICAgICAgICAgICAgY29tbWVudEl0ZW0uYXBwZW5kQ2hpbGQoY29tbWVudEluZm8pXG5cblxuICAgICAgICAgICAgY29tbWVudEl0ZW0uYXBwZW5kQ2hpbGQoY29tbWVudENvbnRlbnQpXG4gICAgICAgICAgICBpZihqd3RVc2VyICYmIChqd3RVc2VyLnN1YiA9PT0gY29tbWVudC51c2VyLl9pZCB8fCBqd3RVc2VyLnN1YiA9PSBibG9nLmF1dGhvci5faWQpKXtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZUJ1dHRvbicpXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gXCJEZWxldGVcIjtcbiAgICAgICAgICAgICAgICBjb21tZW50SXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCgpID0+IGRlbGV0ZUNvbW1lbnQoY29tbWVudC5faWQpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tbWVudExpc3QuYXBwZW5kQ2hpbGQoY29tbWVudEl0ZW0pXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGVudC5hcHBlbmQoY29tbWVudExpc3QpXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnIpXG4gICAgfVxufVxuXG5nZXRwb3N0KCk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQoKXtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3dlYWstaG9ub3JhYmxlLWRlZ3JlZS5nbGl0Y2gubWUvYXBpL3Bvc3RzLyR7YmxvZ2lkfS9jb21tZW50cy9gLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShPYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEpKSxcbiAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoIXJlc3BvbnNlLm9rKXtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGVycm9yRWxlbS50ZXh0Q29udGVudCA9IFwiVXNlciBpcyBub3QgTG9nZ2VkIGluXCJcbiAgICAgICAgICAgIGVycm9yTGlzdC5hcHBlbmRDaGlsZChlcnJvckVsZW0pXG4gICAgICAgICAgICBlcnJvckRpdi5yZXBsYWNlQ2hpbGRyZW4oZXJyb3JMaXN0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIH0gXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnIpXG4gICAgfVxufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnQoY29tbWVudElEKXtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3dlYWstaG9ub3JhYmxlLWRlZ3JlZS5nbGl0Y2gubWUvYXBpL3Bvc3RzLyR7YmxvZ2lkfS9jb21tZW50cy8ke2NvbW1lbnRJRH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLCBcbiAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoIXJlc3BvbnNlLm9rKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICB9IFxuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyKVxuICAgIH1cbn0iLCJpbXBvcnQgJy4uL3N0eWxlcy9uYXZiYXIuY3NzJ1xuaW1wb3J0IHsgdXNlcixsb2dvdXRVc2VyIH0gZnJvbSBcIi4vYWNjb3VudFwiO1xuY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbmNvbnN0IG5hdmJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuY29uc3QgYWNjb3VudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuYWNjb3VudERpdi5jbGFzc0xpc3QuYWRkKCdhY2NvdW50RGl2JylcblxuY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbmhvbWUuaHJlZiA9IFwiL2Jsb2ctd2Vic2l0ZS9cIjtcbmhvbWUudGV4dENvbnRlbnQgPSBcIkhvbWVcIlxuaG9tZS5jbGFzc0xpc3QuYWRkKCdob21lJylcbmhvbWUuY2xhc3NMaXN0LmFkZCgnbmF2SXRlbScpXG5cbmlmICh1c2VyKSB7XG4gICAgY29uc3QgbG9nb3V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbG9nb3V0LnRleHRDb250ZW50ID0gXCJMb2cgT3V0XCJcbiAgICBsb2dvdXQuY2xhc3NMaXN0LmFkZCgnbmF2SXRlbScpXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChsb2dvdXQpXG4gICAgbG9nb3V0Lm9uY2xpY2sgPSBsb2dvdXRVc2VyO1xuXG59IGVsc2Uge1xuICAgIGNvbnN0IGxvZ2luID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxvZ2luLmhyZWYgPSBcIi9ibG9nLXdlYnNpdGUvbG9naW5cIjtcbiAgICBsb2dpbi50ZXh0Q29udGVudCA9IFwiTG9nIEluXCJcbiAgICBsb2dpbi5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcblxuICAgIGNvbnN0IHNpZ251cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBzaWdudXAuaHJlZiA9IFwiL2Jsb2ctd2Vic2l0ZS9zaWdudXBcIjtcbiAgICBzaWdudXAudGV4dENvbnRlbnQgPSBcIlNpZ24gdXBcIlxuICAgIHNpZ251cC5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcblxuICAgIGlmIChsb2dpbi5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgbG9naW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICB9XG4gICAgaWYgKHNpZ251cC5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgc2lnbnVwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChzaWdudXApXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChsb2dpbilcbn1cblxuaWYgKGhvbWUucGF0aG5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzaW5ndXBcIilcbiAgICBob21lLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG59XG5cbm5hdmJhci5hcHBlbmRDaGlsZChob21lKVxubmF2YmFyLmFwcGVuZENoaWxkKGFjY291bnREaXYpO1xubmF2YmFyLmNsYXNzTGlzdC5hZGQoJ25hdmJhcicpXG5kb2N1bWVudC5ib2R5LnByZXBlbmQobmF2YmFyKVxuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9ibG9ncG9zdC5qc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9uYXZiYXIuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2luZGV4LmNzc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmxvZy5jc3NcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=