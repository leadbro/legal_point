const xhr = new XMLHttpRequest()

export default {
    async get(url, data) {
        const query = new URLSearchParams(data)
        const result = await fetch(`${url}?${query}`)
        return result.json()
    },
    post(url, data, callback) {
        xhr.open('POST', `${url}`, true)

        //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.withCredentials = false

        xhr.send(data)

        if (callback && typeof callback === 'function') {
            xhr.onload = () => callback(xhr.status)
        }
    },
}
