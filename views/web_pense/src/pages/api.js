
export async function fetchRequest (url) {
    const response = await fetch(url)
    if (!response.ok) {
        const resJson = await response.json()
        throw {
            message: resJson.message || 'Fetch error',
            status: resJson.status,
            statusText: resJson.statusText
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
