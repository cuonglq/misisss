let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.endUser.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    "id": 1,
    "userLogin": "admin",
    "password": "$2a$10$6ywi2cZ6Sn/v6kuAAbkQTex9zr0nArdo/qouZZlKQKInurBPvLoOq",
    "name": "Đỗ Thanh Tùng",
    "address": "Cẩm Giàng - Hải Dương",
    "gender": 1,
    "birthday": "2017-01-14 11:29:35",
    "phone": "0961105256",
    "email": "tungdo@neonstudio.us",
    "avatar": "",
    "activated": 1
}]