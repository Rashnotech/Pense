
export async function fetchRequest (url) {
    try {
        const response = await fetch(url)
        const data = response.json()
        return data
    } catch (err) {
        const resJson = await res.json()
        throw {
            message: resJson.message || 'Fetch error',
            status: resJson.status,
            statusText: resJson.statusText
        }
    }
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
