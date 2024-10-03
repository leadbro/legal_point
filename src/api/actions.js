import API from './index.js'

// Заглушка
const MOCK_REQUEST = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 300)
})

export function sendRequestForm(data, callback) {
    API.post('/client-request', data, callback)
}
