const jwt = require('jsonwebtoken')
const generarJWT = (id, user) => {
    const payload = { id, user }

    return new Promise((resolve, reject) => {
        jwt.sign(payload, 'un1v3rsidad_c0nt1n3ntal', {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT
}