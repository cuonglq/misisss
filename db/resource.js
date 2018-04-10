let bcrypt = require('bcrypt-nodejs')
let moment = require('moment')
let models = require('../models')
module.exports = () => {
    console.info('resource')
    return new Promise((resolve, reject) => {

        let promises = []
        data.map(item => {
            promises.push(models.resource.upsert(item))
            Promise.all(promises).then(
                resolve()
            )
        })
    })
}
let data = [{
        id: 1,
        name: 'user',
        label: 'Quản lý người dùng',
        menuId: 1
    },
    {
        id: 2,
        name: 'permission',
        label: 'Phân quyền',
        menuId: 1
    },
    {
        id: 3,
        name: 'resource',
        label: 'Quản lý quyền',
        menuId: 1
    },
    {
        id: 4,
        name: 'role',
        label: 'Quản lý nhóm',
        menuId: 1
    },
    {
        id: 5,
        name: 'menu',
        label: 'Quản lý menu',
        menuId: 1
    },
    {
        id: 6,
        name: 'profile',
        label: 'Thông tin cá nhân',
        menuId: 2
    },
    {
        id: 7,
        name: 'promotion',
        label: 'Quản lý ưu đãi',
        menuId: 3
    },
    {
        id: 8,
        name: 'shop',
        label: 'Quản lý cửa hàng',
        menuId: 4
    },
    {
        id: 9,
        name: 'limitCode',
        label: 'Giới hạn mã ưu đãi',
        menuId: 3
    }
]