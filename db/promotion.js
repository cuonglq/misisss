let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    return new Promise((resolve, reject) => {
        let promises = []
        data.map(item => {
            promises.push(models.promotion.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
    id: 1,
    name: 'Ưu đãi giảm giá 1',
    name: "Ưu đãi giảm giá",
    shortDescription: "Giảm gía 10% cho iPhone",
    description: "Mô tả ưu đãi",
    percent: 20,
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    status: 1,
    exchangePoint: 10,
    giftPoint: 10,
    stamp: 5,
    price: 200000,
    likeCount: 2,
    rateCount: 3,
    rate: 3.5,
    limitCode: 0,
    partnerId: 1,
    creatorId: 1,
    promotionTypeId: 1,
    categoryId: 1,
    memberId: 1
}]