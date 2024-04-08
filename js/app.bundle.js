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
    login.href = "/blog-website/login/";
    login.textContent = "Log In"
    login.classList.add('navItem')

    const signup = document.createElement('a');
    signup.href = "/blog-website/signup/";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQU87O0FBRUE7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQVM7Ozs7Ozs7Ozs7OztBQ2pCa0I7QUFDM0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2xENkI7QUFDZTtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLDBDQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0RBQVU7O0FBRS9CLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7VUNsREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvc3R5bGVzL2Jsb2cuY3NzP2RiMmYiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL3N0eWxlcy9pbmRleC5jc3M/NGU0MiIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvc3R5bGVzL25hdmJhci5jc3M/NmY2ZSIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvanMvYWNjb3VudC5qcyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvanMvbmF2YmFyLmpzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgY29uc3QgdXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyVG9rZW4nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ291dFVzZXIoKXtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlclRva2VuJyk7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Jsb2ctd2Vic2l0ZS8nO1xufVxuXG5mdW5jdGlvbiBwYXJzZUp3dCh0b2tlbikge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoXCIuXCIpWzFdO1xuICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKFwiLVwiLCBcIitcIikucmVwbGFjZShcIl9cIiwgXCIvXCIpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKGJhc2U2NCkpO1xuICB9XG5cbiAgLy8gbG9nZ2VkaW4gdXNlclxuICBleHBvcnQgY29uc3Qgand0VXNlciA9IHBhcnNlSnd0KHVzZXIpIiwiaW1wb3J0ICcuLi9zdHlsZXMvYmxvZy5jc3MnXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRcIik7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldHBvc3RzKCkge1xuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS9wb3N0cy8nKVxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXNwb25zZS5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICBjb25zdCBibG9nTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGJsb2dMaXN0LmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbGlzdCcpXG4gICAgICAgIGRhdGEuZm9yRWFjaChibG9nID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJsb2dJdGVtLmNsYXNzTGlzdC5hZGQoJ2Jsb2cnKVxuICAgICAgICAgICAgY29uc3QgYmxvZ0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgICAgIGJsb2dMaW5rLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbGluaycpXG4gICAgICAgICAgICBibG9nTGluay5ocmVmID0gYC9ibG9nP2lkPSR7YmxvZy5faWR9YDtcbiAgICAgICAgICAgIGNvbnN0IGJsb2dJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJsb2dJbmZvLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctaW5mbycpXG5cbiAgICAgICAgICAgIGNvbnN0IGJsb2dUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcbiAgICAgICAgICAgIGJsb2dUaXRsZS50ZXh0Q29udGVudCA9IGJsb2cudGl0bGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGJsb2dBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgICAgIGJsb2dBdXRob3IudGV4dENvbnRlbnQgPSBibG9nLmF1dGhvci51c2VybmFtZTtcblxuICAgICAgICAgICAgY29uc3QgYmxvZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYmxvZ1RleHQuY2xhc3NMaXN0LmFkZCgnYmxvZy10ZXh0JylcblxuICAgICAgICAgICAgY29uc3QgYmxvZ0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgICAgIGJsb2dDb250ZW50LnRleHRDb250ZW50ID0gYmxvZy5jb250ZW50O1xuXG4gICAgICAgICAgICBibG9nVGV4dC5hcHBlbmRDaGlsZChibG9nQ29udGVudClcbiAgICAgICAgICAgIGJsb2dJbmZvLmFwcGVuZENoaWxkKGJsb2dUaXRsZSk7XG4gICAgICAgICAgICBibG9nSW5mby5hcHBlbmRDaGlsZChibG9nQXV0aG9yKTtcbiAgICAgICAgICAgIGJsb2dMaW5rLmFwcGVuZENoaWxkKGJsb2dJbmZvKVxuICAgICAgICAgICAgYmxvZ0xpbmsuYXBwZW5kQ2hpbGQoYmxvZ1RleHQpXG4gICAgICAgICAgICBibG9nSXRlbS5hcHBlbmRDaGlsZChibG9nTGluaylcbiAgICAgICAgICAgIGJsb2dMaXN0LmFwcGVuZENoaWxkKGJsb2dJdGVtKVxuXG4gICAgICAgIH0pO1xuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKGJsb2dMaXN0KVxuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiICsgZXJyKVxuICAgIH1cbn1cblxuZ2V0cG9zdHMoKTsiLCJpbXBvcnQgJy4uL3N0eWxlcy9uYXZiYXIuY3NzJ1xuaW1wb3J0IHsgdXNlcixsb2dvdXRVc2VyIH0gZnJvbSBcIi4vYWNjb3VudFwiO1xuY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbmNvbnN0IG5hdmJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuY29uc3QgYWNjb3VudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuYWNjb3VudERpdi5jbGFzc0xpc3QuYWRkKCdhY2NvdW50RGl2JylcblxuY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbmhvbWUuaHJlZiA9IFwiL2Jsb2ctd2Vic2l0ZS9cIjtcbmhvbWUudGV4dENvbnRlbnQgPSBcIkhvbWVcIlxuaG9tZS5jbGFzc0xpc3QuYWRkKCdob21lJylcbmhvbWUuY2xhc3NMaXN0LmFkZCgnbmF2SXRlbScpXG5cbmlmICh1c2VyKSB7XG4gICAgY29uc3QgbG9nb3V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbG9nb3V0LnRleHRDb250ZW50ID0gXCJMb2cgT3V0XCJcbiAgICBsb2dvdXQuY2xhc3NMaXN0LmFkZCgnbmF2SXRlbScpXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChsb2dvdXQpXG4gICAgbG9nb3V0Lm9uY2xpY2sgPSBsb2dvdXRVc2VyO1xuXG59IGVsc2Uge1xuICAgIGNvbnN0IGxvZ2luID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxvZ2luLmhyZWYgPSBcIi9ibG9nLXdlYnNpdGUvbG9naW4vXCI7XG4gICAgbG9naW4udGV4dENvbnRlbnQgPSBcIkxvZyBJblwiXG4gICAgbG9naW4uY2xhc3NMaXN0LmFkZCgnbmF2SXRlbScpXG5cbiAgICBjb25zdCBzaWdudXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgc2lnbnVwLmhyZWYgPSBcIi9ibG9nLXdlYnNpdGUvc2lnbnVwL1wiO1xuICAgIHNpZ251cC50ZXh0Q29udGVudCA9IFwiU2lnbiB1cFwiXG4gICAgc2lnbnVwLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuICAgIGlmIChsb2dpbi5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgbG9naW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICB9XG4gICAgaWYgKHNpZ251cC5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgc2lnbnVwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChzaWdudXApXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChsb2dpbilcbn1cblxuaWYgKGhvbWUucGF0aG5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzaW5ndXBcIilcbiAgICBob21lLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG59XG5cbm5hdmJhci5hcHBlbmRDaGlsZChob21lKVxubmF2YmFyLmFwcGVuZENoaWxkKGFjY291bnREaXYpO1xubmF2YmFyLmNsYXNzTGlzdC5hZGQoJ25hdmJhcicpXG5kb2N1bWVudC5ib2R5LnByZXBlbmQobmF2YmFyKVxuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9tYWluLmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmxvZy5jc3NcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvanMvbmF2YmFyLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3R5bGVzL2luZGV4LmNzc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==