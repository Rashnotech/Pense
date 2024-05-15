/**
 * 
 * @param {*} url 
 * @param {*} credentials 
 * @param {*} method 
 * @returns response
 */

const request = (url, credentials, method) => {
    return fetch(url, {
        method: method,
        headers: new Headers(
            {
                'content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
        body: JSON.stringify(credentials)
    })
}

/**
 * 
 * @param {*} url 
 * @param {*} method 
 * @returns response
 */
const get_request = (url, method) => {
    return fetch(url, {
        method: method,
        headers: new Headers({'content-Type': 'application/json'}),
    })
}


export const PostRequest = async (url, credentials) => {
    return new Promise((resolve, reject) => {
        request(url, credentials, 'POST')
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
    
}


export const GetRequest = async (url) => {
    return new Promise((resolve, reject) => {
        get_request(url, 'GET')
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

export const PutRequest = async (url, credentials) => {
    return new Promise((resolve, reject) => {
        request(url, credentials, 'PUT')
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
    
}

export const UploadRequest = async (url, credentials) => {
    return new Promise((resolve, reject) => {
        return fetch(url, {
            method: 'PUT',
            body: credentials
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

export const DelRequest = async (url) => {
    return new Promise((resolve, reject) => {
        get_request(url, 'DELETE')
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}


export async function searchPost (url, credential) {
    const res = await fetch (url ,
            {headers: new Headers({'Content-Type': 'application/json'}),
            method: "GET", body: JSON.stringify(credential)})
    if (!res.ok) {
        const resJson = await res.json()
        throw {
            message: resJson.message || 'Unknown error',
            status: res.status,
            statusText: res.statusText
        }
    }
    const data = await res.json()
    return data
}

