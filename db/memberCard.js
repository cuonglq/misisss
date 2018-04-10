let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    return new Promise((resolve, reject) => {
        resolve()
            // let promises = []
            // data.map(item => {
            //     promises.push(models.card.upsert(item))
            //     Promise.all(promises).then(
            //         resolve()
            //     )
            // })
    })
}
let data = [{
    id: 1,
    code: '123456',
    addPoint: 1,
    subPoint: 1,
    endUserId: 1,
    partnerId: 1,
    cardGroupId: 1
}]