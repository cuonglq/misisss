let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    console.info('role')
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.userRole.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    userId: 1,
    roleId: 1
}]