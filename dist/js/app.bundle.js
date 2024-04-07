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
            blogLink.href = `https://brynypatchett.github.io/blog-website/blog?id=${blog._id}`;
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
home.href = "https://brynypatchett.github.io/blog-website/";
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
/******/ 	__webpack_require__("./src/js/main.js");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/styles/blog.css");
/******/ 	__webpack_require__("./src/js/navbar.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/styles/index.css");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQU87O0FBRUE7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQVM7Ozs7Ozs7Ozs7OztBQ2pCVDtBQUNBLENBQTJCO0FBQzNCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLFNBQVM7QUFDN0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3BENkI7QUFDZTtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLDBDQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0RBQVU7O0FBRS9CLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O1VDbkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL3N0eWxlcy9ibG9nLmNzcz9kYjJmIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9zdHlsZXMvaW5kZXguY3NzPzRlNDIiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL3N0eWxlcy9uYXZiYXIuY3NzPzZmNmUiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL2pzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL2pzL25hdmJhci5qcyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGNvbnN0IHVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclRva2VuJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXRVc2VyKCl7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJUb2tlbicpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2h0dHBzOi8vYnJ5bnlwYXRjaGV0dC5naXRodWIuaW8vYmxvZy13ZWJzaXRlLyc7XG59XG5cbmZ1bmN0aW9uIHBhcnNlSnd0KHRva2VuKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdChcIi5cIilbMV07XG4gICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoXCItXCIsIFwiK1wiKS5yZXBsYWNlKFwiX1wiLCBcIi9cIik7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uod2luZG93LmF0b2IoYmFzZTY0KSk7XG4gIH1cblxuICAvLyBsb2dnZWRpbiB1c2VyXG4gIGV4cG9ydCBjb25zdCBqd3RVc2VyID0gcGFyc2VKd3QodXNlcikiLCJjb25zb2xlLmxvZyhcIkhlbGxvIEZST00gSE9NRVBBR0VcIilcbmltcG9ydCAnLi4vc3R5bGVzL2Jsb2cuY3NzJ1xuY29uc3QgY29udGVudCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRwb3N0cygpIHtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vd2Vhay1ob25vcmFibGUtZGVncmVlLmdsaXRjaC5tZS9hcGkvcG9zdHMvJylcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzcG9uc2Uuc3RhdHVzKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgY29uc3QgYmxvZ0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBibG9nTGlzdC5jbGFzc0xpc3QuYWRkKCdibG9nLWxpc3QnKVxuICAgICAgICBkYXRhLmZvckVhY2goYmxvZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBibG9nSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBibG9nSXRlbS5jbGFzc0xpc3QuYWRkKCdibG9nJylcbiAgICAgICAgICAgIGNvbnN0IGJsb2dMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgICAgICBibG9nTGluay5jbGFzc0xpc3QuYWRkKCdibG9nLWxpbmsnKVxuICAgICAgICAgICAgYmxvZ0xpbmsuaHJlZiA9IGBodHRwczovL2JyeW55cGF0Y2hldHQuZ2l0aHViLmlvL2Jsb2ctd2Vic2l0ZS9ibG9nP2lkPSR7YmxvZy5faWR9YDtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJsb2dJbmZvLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctaW5mbycpXG5cbiAgICAgICAgICAgIGNvbnN0IGJsb2dUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICAgICAgICAgIGJsb2dUaXRsZS50ZXh0Q29udGVudCA9IGJsb2cudGl0bGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGJsb2dBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgICAgIGJsb2dBdXRob3IudGV4dENvbnRlbnQgPSBibG9nLmF1dGhvci51c2VybmFtZTtcblxuICAgICAgICAgICAgY29uc3QgYmxvZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYmxvZ1RleHQuY2xhc3NMaXN0LmFkZCgnYmxvZy10ZXh0JylcblxuICAgICAgICAgICAgY29uc3QgYmxvZ0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgICAgIGJsb2dDb250ZW50LnRleHRDb250ZW50ID0gYmxvZy5jb250ZW50O1xuXG4gICAgICAgICAgICBibG9nVGV4dC5hcHBlbmRDaGlsZChibG9nQ29udGVudClcbiAgICAgICAgICAgIGJsb2dJbmZvLmFwcGVuZENoaWxkKGJsb2dUaXRsZSk7XG4gICAgICAgICAgICBibG9nSW5mby5hcHBlbmRDaGlsZChibG9nQXV0aG9yKTtcbiAgICAgICAgICAgIGJsb2dMaW5rLmFwcGVuZENoaWxkKGJsb2dJbmZvKVxuICAgICAgICAgICAgYmxvZ0xpbmsuYXBwZW5kQ2hpbGQoYmxvZ1RleHQpXG4gICAgICAgICAgICBibG9nSXRlbS5hcHBlbmRDaGlsZChibG9nTGluaylcbiAgICAgICAgICAgIGJsb2dMaXN0LmFwcGVuZENoaWxkKGJsb2dJdGVtKVxuXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhibG9nTGlzdClcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChibG9nTGlzdClcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiArIGVycilcbiAgICB9XG59XG5cbmdldHBvc3RzKCk7IiwiaW1wb3J0ICcuLi9zdHlsZXMvbmF2YmFyLmNzcydcbmltcG9ydCB7IHVzZXIsbG9nb3V0VXNlciB9IGZyb20gXCIuL2FjY291bnRcIjtcbmNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG5jb25zdCBuYXZiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbmNvbnN0IGFjY291bnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmFjY291bnREaXYuY2xhc3NMaXN0LmFkZCgnYWNjb3VudERpdicpXG5cbmNvbnN0IGhvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5ob21lLmhyZWYgPSBcImh0dHBzOi8vYnJ5bnlwYXRjaGV0dC5naXRodWIuaW8vYmxvZy13ZWJzaXRlL1wiO1xuaG9tZS50ZXh0Q29udGVudCA9IFwiSG9tZVwiXG5ob21lLmNsYXNzTGlzdC5hZGQoJ2hvbWUnKVxuaG9tZS5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcblxuaWYgKHVzZXIpIHtcbiAgICBjb25zdCBsb2dvdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsb2dvdXQudGV4dENvbnRlbnQgPSBcIkxvZyBPdXRcIlxuICAgIGxvZ291dC5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcbiAgICBhY2NvdW50RGl2LmFwcGVuZENoaWxkKGxvZ291dClcbiAgICBsb2dvdXQub25jbGljayA9IGxvZ291dFVzZXI7XG5cbn0gZWxzZSB7XG4gICAgY29uc3QgbG9naW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbG9naW4uaHJlZiA9IFwiaHR0cHM6Ly9icnlueXBhdGNoZXR0LmdpdGh1Yi5pby9ibG9nLXdlYnNpdGUvbG9naW5cIjtcbiAgICBsb2dpbi50ZXh0Q29udGVudCA9IFwiTG9nIEluXCJcbiAgICBsb2dpbi5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcblxuICAgIGNvbnN0IHNpZ251cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBzaWdudXAuaHJlZiA9IFwiaHR0cHM6Ly9icnlueXBhdGNoZXR0LmdpdGh1Yi5pby9ibG9nLXdlYnNpdGUvc2lnbnVwXCI7XG4gICAgc2lnbnVwLnRleHRDb250ZW50ID0gXCJTaWduIHVwXCJcbiAgICBzaWdudXAuY2xhc3NMaXN0LmFkZCgnbmF2SXRlbScpXG5cbiAgICBpZiAobG9naW4ucGF0aG5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIGxvZ2luLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgfVxuICAgIGlmIChzaWdudXAucGF0aG5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIHNpZ251cC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgIH1cblxuICAgIGFjY291bnREaXYuYXBwZW5kQ2hpbGQoc2lnbnVwKVxuICAgIGFjY291bnREaXYuYXBwZW5kQ2hpbGQobG9naW4pXG59XG5cbmlmIChob21lLnBhdGhuYW1lID09PSBjdXJyZW50UGFnZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwic2luZ3VwXCIpXG4gICAgaG9tZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxufVxuXG5uYXZiYXIuYXBwZW5kQ2hpbGQoaG9tZSlcbm5hdmJhci5hcHBlbmRDaGlsZChhY2NvdW50RGl2KTtcbm5hdmJhci5jbGFzc0xpc3QuYWRkKCduYXZiYXInKVxuZG9jdW1lbnQuYm9keS5wcmVwZW5kKG5hdmJhcilcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2Jsb2cuY3NzXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2pzL25hdmJhci5qc1wiKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3N0eWxlcy9pbmRleC5jc3NcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=