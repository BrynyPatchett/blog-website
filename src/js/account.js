export const user = localStorage.getItem('userToken');

export function logoutUser(){
    localStorage.removeItem('userToken');
    window.location.href = '/';
}