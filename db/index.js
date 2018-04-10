let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')

let categories = require('./category')
let menus = require('./menu')
let resources = require('./resource')
let roles = require('./role')
let permissions = require('./permission')
let promotionTypes = require('./promotionType')
let users = require('./user')
let promotions = require('./promotion')
let codeType = require('./codeType')
let memberTypes = require('./memberType')
let partners = require('./partner')
let userRoles = require('./userRole')
let cardGroups = require('./cardGroup')
let cards = require('./card')
let endUsers = require('./endUser')
module.exports = () => {
    categories().then(() => {
        return menus()
    }).then(() => {
        return resources()
    }).then(() => {
        return roles()
    }).then(() => {
        return permissions()
    }).then(() => {
        return promotionTypes()
    }).then(() => {
        return users()
    }).then(() => {
        return endUsers()
    }).then(() => {
        return codeType()
    }).then(() => {
        return memberTypes()
    }).then(() => {
        return partners()
    }).then(() => {
        return userRoles()
    }).then(() => {
        return cardGroups()
    }).then(() => {
        return cards()
    })
}