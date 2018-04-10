let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    console.info('menu')
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.menu.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    name: 'Quản trị hệ thống',
    displayOrder: 1
}, {
    id: 2,
    name: 'Quản lý tài khoản',
    displayOrder: 100
}, {
    id: 3,
    name: 'Quản lý ưu đãi',
    displayOrder: 100
}, {
    id: 4,
    name: 'Quản lý cửa hàng',
    displayOrder: 100
}, ]