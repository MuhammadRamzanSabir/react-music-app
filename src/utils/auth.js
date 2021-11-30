export const getAuthTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
}

export const isAuthenticatedUser = () => {
    return localStorage.getItem('token') ? true : false;
}