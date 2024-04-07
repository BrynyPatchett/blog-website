/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/navbar.css":
/*!*******************************!*\
  !*** ./src/styles/navbar.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/account.js":
/*!***************************!*\
  !*** ./src/js/account.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/navbar.js ***!
  \**************************/
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




})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**************************!*\
  !*** ./src/js/signup.js ***!
  \**************************/

const signupButton = document.getElementById("signup-button");
console.log(signupButton)
const form = document.getElementById("signup-form");
signupButton.addEventListener('click', signup)

const errorDiv = document.getElementById("errors-container");
async function signup() {
    const formData = new FormData(form);
    try {
        const response = await fetch('https://weak-honorable-degree.glitch.me/api/users/', {
            method: 'POST', 
            body: JSON.stringify(Object.fromEntries(formData)),
             headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            const data = await response.json()
            const errorList = document.createElement('ul')
            
            data.forEach(error => {
                const errorElem = document.createElement('li')
                errorElem.textContent = error.msg;
                errorList.appendChild(errorElem)
            });
            errorDiv.replaceChildren(errorList)
            return

        }else{
            window.location.href = 'https://brynypatchett.github.io/blog-website/login';
        }
    }
    catch (err) {
        console.log("error: " + err)
    }
}

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2lnbnVwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBTzs7QUFFQTtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBUzs7Ozs7O1VDakJUO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNONkI7QUFDZTtBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLDBDQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0RBQVU7O0FBRS9CLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9zdHlsZXMvbmF2YmFyLmNzcz82ZjZlIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9qcy9hY2NvdW50LmpzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Jsb2ctd2Vic2l0ZS8uL3NyYy9qcy9uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vYmxvZy13ZWJzaXRlLy4vc3JjL2pzL3NpZ251cC5qcyIsIndlYnBhY2s6Ly9ibG9nLXdlYnNpdGUvLi9zcmMvc3R5bGVzL2luZGV4LmNzcz80ZTQyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBjb25zdCB1c2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJUb2tlbicpO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0VXNlcigpe1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyVG9rZW4nKTtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2JyeW55cGF0Y2hldHQuZ2l0aHViLmlvL2Jsb2ctd2Vic2l0ZS8nO1xufVxuXG5mdW5jdGlvbiBwYXJzZUp3dCh0b2tlbikge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoXCIuXCIpWzFdO1xuICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKFwiLVwiLCBcIitcIikucmVwbGFjZShcIl9cIiwgXCIvXCIpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKGJhc2U2NCkpO1xuICB9XG5cbiAgLy8gbG9nZ2VkaW4gdXNlclxuICBleHBvcnQgY29uc3Qgand0VXNlciA9IHBhcnNlSnd0KHVzZXIpIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3N0eWxlcy9uYXZiYXIuY3NzJ1xuaW1wb3J0IHsgdXNlcixsb2dvdXRVc2VyIH0gZnJvbSBcIi4vYWNjb3VudFwiO1xuY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbmNvbnN0IG5hdmJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuY29uc3QgYWNjb3VudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuYWNjb3VudERpdi5jbGFzc0xpc3QuYWRkKCdhY2NvdW50RGl2JylcblxuY29uc3QgaG9tZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbmhvbWUuaHJlZiA9IFwiaHR0cHM6Ly9icnlueXBhdGNoZXR0LmdpdGh1Yi5pby9ibG9nLXdlYnNpdGUvXCI7XG5ob21lLnRleHRDb250ZW50ID0gXCJIb21lXCJcbmhvbWUuY2xhc3NMaXN0LmFkZCgnaG9tZScpXG5ob21lLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuXG5pZiAodXNlcikge1xuICAgIGNvbnN0IGxvZ291dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxvZ291dC50ZXh0Q29udGVudCA9IFwiTG9nIE91dFwiXG4gICAgbG9nb3V0LmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuICAgIGFjY291bnREaXYuYXBwZW5kQ2hpbGQobG9nb3V0KVxuICAgIGxvZ291dC5vbmNsaWNrID0gbG9nb3V0VXNlcjtcblxufSBlbHNlIHtcbiAgICBjb25zdCBsb2dpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsb2dpbi5ocmVmID0gXCJodHRwczovL2JyeW55cGF0Y2hldHQuZ2l0aHViLmlvL2Jsb2ctd2Vic2l0ZS9sb2dpblwiO1xuICAgIGxvZ2luLnRleHRDb250ZW50ID0gXCJMb2cgSW5cIlxuICAgIGxvZ2luLmNsYXNzTGlzdC5hZGQoJ25hdkl0ZW0nKVxuXG4gICAgY29uc3Qgc2lnbnVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHNpZ251cC5ocmVmID0gXCJodHRwczovL2JyeW55cGF0Y2hldHQuZ2l0aHViLmlvL2Jsb2ctd2Vic2l0ZS9zaWdudXBcIjtcbiAgICBzaWdudXAudGV4dENvbnRlbnQgPSBcIlNpZ24gdXBcIlxuICAgIHNpZ251cC5jbGFzc0xpc3QuYWRkKCduYXZJdGVtJylcblxuICAgIGlmIChsb2dpbi5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgbG9naW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICB9XG4gICAgaWYgKHNpZ251cC5wYXRobmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgc2lnbnVwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChzaWdudXApXG4gICAgYWNjb3VudERpdi5hcHBlbmRDaGlsZChsb2dpbilcbn1cblxuaWYgKGhvbWUucGF0aG5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJzaW5ndXBcIilcbiAgICBob21lLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG59XG5cbm5hdmJhci5hcHBlbmRDaGlsZChob21lKVxubmF2YmFyLmFwcGVuZENoaWxkKGFjY291bnREaXYpO1xubmF2YmFyLmNsYXNzTGlzdC5hZGQoJ25hdmJhcicpXG5kb2N1bWVudC5ib2R5LnByZXBlbmQobmF2YmFyKVxuXG5cblxuIiwiXG5jb25zdCBzaWdudXBCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cC1idXR0b25cIik7XG5jb25zb2xlLmxvZyhzaWdudXBCdXR0b24pXG5jb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWdudXAtZm9ybVwiKTtcbnNpZ251cEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNpZ251cClcblxuY29uc3QgZXJyb3JEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9ycy1jb250YWluZXJcIik7XG5hc3luYyBmdW5jdGlvbiBzaWdudXAoKSB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly93ZWFrLWhvbm9yYWJsZS1kZWdyZWUuZ2xpdGNoLm1lL2FwaS91c2Vycy8nLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShPYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEpKSxcbiAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBpZighcmVzcG9uc2Uub2spe1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICAgICAgY29uc3QgZXJyb3JMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgICAgICBlcnJvckVsZW0udGV4dENvbnRlbnQgPSBlcnJvci5tc2c7XG4gICAgICAgICAgICAgICAgZXJyb3JMaXN0LmFwcGVuZENoaWxkKGVycm9yRWxlbSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXJyb3JEaXYucmVwbGFjZUNoaWxkcmVuKGVycm9yTGlzdClcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly9icnlueXBhdGNoZXR0LmdpdGh1Yi5pby9ibG9nLXdlYnNpdGUvbG9naW4nO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIgKyBlcnIpXG4gICAgfVxufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9