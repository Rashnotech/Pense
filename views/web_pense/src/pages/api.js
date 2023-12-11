
export async function fetchRequest (url) {
    const response = await fetch(url)
    if (!response.ok) {
        const error_json = await response.json()
        throw {
            message: error_json.message || 'Fetch error',
            status: error_json.status,
            statusText: error_json.statusText
        }

    }
    const data = await response.json()
    return data
}

export async function loginRequest (url, credential) {
    const res = await fetch (url ,
            {headers: new Headers({'Content-Type': 'application/json'}),
            method: "POST", body: JSON.stringify(credential)})
    if (!res.ok) {
        const res_error = await res.json()
        throw {
            message: res_error.message || 'Unknown error',
            status: res.status,
            statusText: res.statusText
        }
    }
    const data = await res.json()
    return data
}

export async function registerRequest (url, credential) {
    const res = await fetch (url ,
            {headers: new Headers({'Content-Type': 'application/json'}),
            method: "POST", body: JSON.stringify(credential)})
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