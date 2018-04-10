let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    console.info('permission')
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.permission.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
        id: 1,
        roleId: 1,
        resourceId: 1
    },
    {
        id: 2,
        roleId: 1,
        resourceId: 2
    },
    {
        id: 3,
        roleId: 1,
        resourceId: 3
    }, {
        id: 4,
        roleId: 1,
        resourceId: 4
    }, {
        id: 5,
        roleId: 1,
        resourceId: 5
    }, {
        id: 6,
        roleId: 1,
        resourceId: 6
    }, {
        id: 7,
        roleId: 1,
        resourceId: 7
    }, {
        id: 8,
        roleId: 1,
        resourceId: 8
    }, {
        id: 9,
        roleId: 1,
        resourceId: 9
    }
]