export const AsyncStorage = (token, user) => {
    sessionStorage.setItem('Browser_session', JSON.stringify(
        {'isLogged': true,
        'id': token,
        'user': user
    }))
    localStorage.setItem('Browser_session', JSON.stringify({
        'isLogged': true,
        'id': token,
        'user': user}))
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

