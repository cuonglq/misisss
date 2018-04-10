let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.category.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    name: 'Ẩm thực'
}, {
    id: 2,
    name: 'Mua sắm'
}, {
    id: 3,
    name: 'Giải trí'
}, {
    id: 4,
    name: 'Du lịch'
}, {
    id: 5,
    name: 'Sức khỏe'
}, {
    id: 6,
    name: 'Giáo dục'
}]