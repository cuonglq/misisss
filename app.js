let express = require('express')

let app = express();
config = require('./config/app.json')
admin = require('./admin')
facebook = require('./api/facebook')
let i18n = require('i18n')
var session = require('express-session');
var cookieParser = require('cookie-parser');
let apiShop = require('./apiShop')
let api = require('./api');
let schedule = require('./api/schedule');
var cors = require('cors');
//let sync = require('./sync/syncApp')
let utils = require('./lib/utils')
let bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

let autoRemoveExpired = require('./lib/autoRemoveExpired')
let autoExpired = require('./lib/autoExpired')
models = require('./models')
app.options(cors({ origin: '*' })); //Use your origins.
app.use(cors({ origin: '*' })); //Use your origins.
let path = require('path')
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/static/Uploads', express.static(path.join(__dirname, '../static/Uploads')))
app.use('/', express.static(path.join(__dirname, 'website')))
app.use(fileUpload());
port = config.PORT
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

i18n.configure({

    //define how many languages we would support in our application
    locales: ['vi', 'en'],

    //define the path to language json files, default is /locales
    directory: __dirname + '/locales',

    //define the default language
    defaultLocale: 'en',

    // define a custom cookie name to parse locale settings from 
    cookie: 'i18n',
    register: global

});


app.use(cookieParser("i18n_demo"));

app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

//init i18n after cookie-parser
app.use(i18n.init);

app.use((req, res, next) => {
    app.locals.__ = res.__;
    next();
})
let getcode = require('./api/getcode')

//app.use('/admin', admin)
//app.use('/wp-admin', admin)

app.use('/fbgroup', facebook)
app.use('/api', api)
app.use('/apiShop', apiShop)
let moment = require('moment')
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let web = require('./socket')(io, app, path, moment, config, utils, models, getcode)


models.sequelize.sync().then(() => {
    //add auto havest
    autoRemoveExpired.add(models.otp)
    autoRemoveExpired.add(models.token)
    autoRemoveExpired.start()
   // autoExpired.start()
    // models.sentCode.findAll({ attribute: ['code', 'expiredAt', 'promotionId', 'sentTo', 'useTimes', 'createdAt'], where: { expiredAt: { $lte: new Date() } } }).then(expire => {
    //     if (expire && expire.length > 0) {
    //         let arr = [];
    //         let arrs = [];
    //         for (let i = 0; i < expire.length; i++) {
    //             arrs.push({
    //                 code: expire[i].code,
    //                 promotionId: expire[i].promotionId,
    //                 sentTo: expire[i].sentTo,
    //                 expiredAt: expire[i].expiredAt,
    //                 useTimes: expire[i].useTimes,
    //                 partnerId: expire[i].partnerId,
    //                 currentMemberId: expire[i].currentMemberId,
    //                 getCodeAt: expire[i].createdAt
    //             })
    //             arr.push(expire[i].id);
    //         }
    //         models.expiredCode.bulkCreate(arrs).then(data => {
    //             console.log(data);
    //             models.sentCode.destroy({ where: { id: { $in: arr } } }).then(del => {

    //             })
    //         })
    //     }


    // })
   let  start= () => {
      //  console.log('aheh');
        //return
        // setInterval(() => {
            models.sentCode.findAll({
                attribute: ['code', 'expiredAt', 'promotionId', 'sentTo', 'useTimes', 'createdAt'],
                where: {
                    expiredAt: { $lte: new Date() }
                },
                    include: [{
                        model: models.promotion,
                        required: true

                    }]
                
            }).then(expire => {
               // console.log(expire);
                if (expire && expire.length > 0) {
                    let arr = [];
                    let arrs = [];
                    let arrNew=[];
                    let arrPr=[];


                    for (let i = 0; i < expire.length; i++) {

                        if (expire[i].promotion.meta) {
                            try {
                                expire[i].promotion.meta = JSON.parse(expire[i].promotion.meta);
                            }
                            catch (err) {
                                console.log(err);
                            }
                        
                        if (expire[i].promotion.meta.returnExpired && expire[i].promotion.codeTypeId == 3) {
                            arrNew.push[{ promotionId: expire[i].promotion.id, code: expire[i].promotion.code }];
                            arrPr.push( expire[i].promotion.id);

                        }
                        else if (expire[i].promotion.meta.returnExpired && expire[i].promotion.codeTypeId == 1) {
                            arrs.push({
                                code: expire[i].code,
                                promotionId: expire[i].promotionId,
                                sentTo: expire[i].sentTo,
                                expiredAt: expire[i].expiredAt,
                                useTimes: expire[i].useTimes,
                                partnerId: expire[i].partnerId,
                                currentMemberId: expire[i].currentMemberId,
                                getCodeAt: expire[i].createdAt
                            })
                            arr.push(expire[i].id);
                            arrPr.push( expire[i].promotion.id);
                        }
                    }
                    }
                    models.newCode.bulkCreate(arrNew).then(dt => {
                        models.expiredCode.bulkCreate(arrs).then(data => {
                            console.log(data);
                            models.sentCode.destroy({ where: { id: { $in: arr } } }).then(del => {
                                models.promotion.findAll({where:{id:{$in:arrPr}}}).then(promotion=>{
                                    if(promotion)
                                    {
                                        for(let i=0; i< promotion.length;i++)
                                        {
                                            promotion[i].increment({
                                                sentCode: -1,
                                                remainCode: 1
                                            })
                                        }
                                    }
                                })
                            })
                        })
                    })


                }
            })
        // }, 1000)
    }
    setInterval(function(){
        start();
    }, 10000);
    server.listen(port, result => console.log(`app listening on port: ${port}`))

})


