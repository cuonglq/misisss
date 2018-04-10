let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.codeType.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    name: 'Mã ngẫu nhiên'
}, {
    id: 2,
    name: 'Mã nhập sẵn, MLoyalty đối soát'
}, {
    id: 3,
    name: 'Mã nhập sẵn, đối tác đối soát'
}]