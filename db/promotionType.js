let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.promotionType.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    name: 'Giảm giá'
}, {
    id: 2,
    name: 'Tặng điểm'
}, {
    id: 3,
    name: 'Đổi điểm'
}, {
    id: 4,
    name: 'Tích tem'
}, {
    id: 5,
    name: 'Quà tặng đặc biệt'
}]