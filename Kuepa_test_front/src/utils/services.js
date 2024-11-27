export const apiUrl = 'http://localhost:3000';

export const postData = async(url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if(!response.ok) {
        let message = data.message || data;
        return {error: true, message}
    }
    return data;
}

export const getData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok) {
        let message = data.message || data;
        return {error: true, message}
    }
    return data;
}