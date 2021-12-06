export const setUserInfoToLocalStorage = data => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('userRole', data.userRole);
}

export const removeUserInfoToLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
}

export const isArtist = () => {
    return localStorage.getItem('userRole') === 'Artist';
}

export const getAuthTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
}

export const isAuthenticatedUser = () => {
    return localStorage.getItem('token') ? true : false;
}