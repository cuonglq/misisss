let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    console.info('role')
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.role.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    name: 'admin'
}, {
    id: 2,
    name: 'member'
}, {
    id: 3,
    name: 'partner'
}, {
    id: 4,
    name: 'shop'
}, {
    id: 5,
    name: 'employees'
}, {
    id: 6,
    name: 'user'
}]