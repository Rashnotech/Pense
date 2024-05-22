
export const AsyncStorage = (token, user, auth_token) => {
    sessionStorage.setItem('Browser_session', JSON.stringify(
        {'isLogged': true,
        'id': token,
        'user': user
    }))
    localStorage.setItem('Browser_session', JSON.stringify({
        'isLogged': true,
        'id': token,
        'user': user}))
        
    const expire = new Date();
    expire.setTime(expire.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = `auth_token=${auth_token}; expires=${expire.toUTCString()}`
}


export const uploadFile = (selectors) => {
    const file = document.querySelector(selectors.file)
    const poster = document.querySelector(selectors.poster)
    return new Promise((resolve, reject) => {
        if (!file.files.length) {
            reject('Please select a file')
        }
        if (file.files.size > 5120) {
            reject('File size is too large')
        }
        poster.src = URL.createObjectURL(file.files[0])
        resolve(file.files[0])
    })
};

export const get_cookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Cookie not found
}