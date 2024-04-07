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

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_blog_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/blog.css */ "./src/styles/blog.css");
console.log("Hello FROM HOMEPAGE")
;
const content = document.body.querySelector(".content");

async function getposts() {

    try {
        const response = await fetch('https://weak-honorable-degree.glitch.me/api/posts/')
        if (!response.ok) {
            throw Error(response.status)
        }
        const data = await response.json()
        const blogList = document.createElement('div')
        blogList.classList.add('blog-list')
        data.forEach(blog => {
            const blogItem = document.createElement('div')
            blogItem.classList.add('blog')
            const blogLink = document.createElement('a')
            blogLink.classList.add('blog-link')
            blogLink.href = `/blog-website/blog?id=${blog._id}`;
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
}

getposts();

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
/******/ 	__webpack_require__("./src/js/main.js");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/styles/blog.css");
/******/ 	__webpack_require__("./src/js/navbar.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/index.css");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQU87O0FBRUE7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQVM7Ozs7Ozs7Ozs7OztBQ2pCVDtBQUNBLENBQTJCO0FBQzNCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELFNBQVM7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3BENkI7QUFDZTtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLDBDQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0RBQVU7O0FBRS9CLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O1VDbkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL3N0eWxlcy9ibG9nLmNzcz9kYjJmIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL3N0eWxlcy9uYXZiYXIuY3NzPzZmNmUiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL2pzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL2pzL25hdmJhci5qcyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGNvbnN0IHVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXRVc2VyKCl7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJUb2tlbicpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9ibG9nLXdlYnNpdGUvJztcbn1cblxuZnVuY3Rpb24gcGFyc2VKd3QodG9rZW4pIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KFwiLlwiKVsxXTtcbiAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZShcIi1cIiwgXCIrXCIpLnJlcGxhY2UoXCJfXCIsIFwiL1wiKTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cuYXRvYihiYXNlNjQpKTtcbiAgfVxuXG4gIC8vIGxvZ2dlZGluIHVzZXJcbiAgZXhwb3J0IGNvbnN0IGp3dFVzZXIgPSBwYXJzZUp3dCh1c2VyKSIsImNvbnNvbGUubG9nKFwiSGVsbG8gRlJPTSBIT01FUEFHRVwiKVxuaW1wb3J0ICcuLi9zdHlsZXMvYmxvZy5jc3MnXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldHBvc3RzKCkge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS9wb3N0cy8nKVxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXNwb25zZS5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICBjb25zdCBibG9nTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGJsb2dMaXN0LmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbGlzdCcpXG4gICAgICAgIGRhdGEuZm9yRWFjaChibG9nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJsb2dJdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2cnKVxuICAgICAgICAgICAgY29uc3QgYmxvZ0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgICAgIGJsb2dMaW5rLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbGluaycpXG4gICAgICAgICAgICBibG9nTGluay5ocmVmID0gYC9ibG9nLXdlYnNpdGUvYmxvZz9pZD0ke2Jsb2cuX2lkfWA7XG4gICAgICAgICAgICBjb25zdCBibG9nSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBibG9nSW5mby5jbGFzc0xpc3QuYWRkKCdibG9nLWluZm8nKVxuXG4gICAgICAgICAgICBjb25zdCBibG9nVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpXG4gICAgICAgICAgICBibG9nVGl0bGUudGV4dENvbnRlbnQgPSBibG9nLnRpdGxlO1xuXG4gICAgICAgICAgICBjb25zdCBibG9nQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgICAgICBibG9nQXV0aG9yLnRleHRDb250ZW50ID0gYmxvZy5hdXRob3IudXNlcm5hbWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGJsb2dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJsb2dUZXh0LmNsYXNzTGlzdC5hZGQoJ2Jsb2ctdGV4dCcpXG5cbiAgICAgICAgICAgIGNvbnN0IGJsb2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgICAgICAgICBibG9nQ29udGVudC50ZXh0Q29udGVudCA9IGJsb2cuY29udGVudDtcblxuICAgICAgICAgICAgYmxvZ1RleHQuYXBwZW5kQ2hpbGQoYmxvZ0NvbnRlbnQpXG4gICAgICAgICAgICBibG9nSW5mby5hcHBlbmRDaGlsZChibG9nVGl0bGUpO1xuICAgICAgICAgICAgYmxvZ0luZm8uYXBwZW5kQ2hpbGQoYmxvZ0F1dGhvcik7XG4gICAgICAgICAgICBibG9nTGluay5hcHBlbmRDaGlsZChibG9nSW5mbylcbiAgICAgICAgICAgIGJsb2dMaW5rLmFwcGVuZENoaWxkKGJsb2dUZXh0KVxuICAgICAgICAgICAgYmxvZ0l0ZW0uYXBwZW5kQ2hpbGQoYmxvZ0xpbmspXG4gICAgICAgICAgICBibG9nTGlzdC5hcHBlbmRDaGlsZChibG9nSXRlbSlcblxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coYmxvZ0xpc3QpXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYmxvZ0xpc3QpXG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnIpXG4gICAgfVxufVxuXG5nZXRwb3N0cygpOyIsImltcG9ydCAnLi4vc3R5bGVzL25hdmJhci5jc3MnXG5pbXBvcnQgeyB1c2VyLGxvZ291dFVzZXIgfSBmcm9tIFwiLi9hY2NvdW50XCI7XG5jb25zdCBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuY29uc3QgbmF2YmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG5jb25zdCBhY2NvdW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5hY2NvdW50RGl2LmNsYXNzTGlzdC5hZGQoJ2FjY291bnREaXYnKVxuXG5jb25zdCBob21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuaG9tZS5ocmVmID0gXCIvYmxvZy13ZWJzaXRlL1wiO1xuaG9tZS50ZXh0Q29udGVudCA9IFwiSG9tZVwiXG5ob21lLmNsYXNzTGlzdC5hZGQoJ2hvbWUnKVxuaG9tZS5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcblxuaWYgKHVzZXIpIHtcbiAgICBjb25zdCBsb2dvdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsb2dvdXQudGV4dENvbnRlbnQgPSBcIkxvZyBPdXRcIlxuICAgIGxvZ291dC5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcbiAgICBhY2NvdW50RGl2LmFwcGVuZENoaWxkKGxvZ291dClcbiAgICBsb2dvdXQub25jbGljayA9IGxvZ291dFVzZXI7XG5cbn0gZWxzZSB7XG4gICAgY29uc3QgbG9naW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbG9naW4uaHJlZiA9IFwiL2Jsb2ctd2Vic2l0ZS9sb2dpblwiO1xuICAgIGxvZ2luLnRleHRDb250ZW50ID0gXCJMb2cgSW5cIlxuICAgIGxvZ2luLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuXG4gICAgY29uc3Qgc2lnbnVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHNpZ251cC5ocmVmID0gXCIvYmxvZy13ZWJzaXRlL3NpZ251cFwiO1xuICAgIHNpZ251cC50ZXh0Q29udGVudCA9IFwiU2lnbiB1cFwiXG4gICAgc2lnbnVwLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuXG4gICAgaWYgKGxvZ2luLnBhdGhuYW1lID09PSBjdXJyZW50UGFnZSkge1xuICAgICAgICBsb2dpbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIH1cbiAgICBpZiAoc2lnbnVwLnBhdGhuYW1lID09PSBjdXJyZW50UGFnZSkge1xuICAgICAgICBzaWdudXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICB9XG5cbiAgICBhY2NvdW50RGl2LmFwcGVuZENoaWxkKHNpZ251cClcbiAgICBhY2NvdW50RGl2LmFwcGVuZENoaWxkKGxvZ2luKVxufVxuXG5pZiAoaG9tZS5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInNpbmd1cFwiKVxuICAgIGhvbWUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbn1cblxubmF2YmFyLmFwcGVuZENoaWxkKGhvbWUpXG5uYXZiYXIuYXBwZW5kQ2hpbGQoYWNjb3VudERpdik7XG5uYXZiYXIuY2xhc3NMaXN0LmFkZCgnbmF2YmFyJylcbmRvY3VtZW50LmJvZHkucHJlcGVuZChuYXZiYXIpXG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL21haW4uanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3N0eWxlcy9ibG9nLmNzc1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9uYXZiYXIuanNcIik7XG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvaW5kZXguY3NzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9