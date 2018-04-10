let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.partner.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    name: "Member MLoyalty",
    shortName: "MLoyalty",
    slogan: "Truyền thông số 1",
    logo: "",
    detail: "Thông tin chi tiết đối tác",
    website: "website",
    phone: "0123456",
    card: " ",
    email: "Email",
    isMember: 1,
    addPoint: 1,
    subPoint: 2,
    limitPoint: 100,
    memberTypeId: 1
}, {
    id: 2,
    name: "Hoa huong duong",
    shortName: "huonog duong",
    slogan: "Nhaf hang doi hoa",
    logo: "",
    detail: "Thông tin chi tiết đối tác",
    website: "website",
    phone: "0123456",
    card: " ",
    email: "Email",
    isMember: 1,
    addPoint: 1,
    subPoint: 2,
    limitPoint: 100,
    memberTypeId: 1
}]