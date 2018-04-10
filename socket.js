



// let config = require('./config/app.json')
// let models = require('./models')
// let cache = require('./lib/cache')
// let backend = require('./api/backendAPI')
// let getcode = require('./api/getcode')
// let sequelize = require('sequelize')
// let utils = require('./lib/utils')

module.exports = function (io, app, path, moment, config, utils, models, getcode) {

  app.set('views', path.join(__dirname, 'views'))
  app.set("view engine", "ejs");
  app.set("views", "./test");

  io.on('connection', function (socket) {
    console.log('A user connected' + socket.id);
     let interval;
    genQR(io, socket.id).then(res => {
    interval = setInterval(function () {
        verifyQRWeb(res.data, io).then(res1 => {
          console.log(res1);
          if (res1.err == 0) {
              clearInterval(interval);
            //   io.sockets.emit("token", res1.data);
            //socket.send(res1.data);
            console.log(res1.data);
            
          }
         
        })


      }, 2000);
    })
     setTimeout(function () {

      clearInterval(interval);

      console.log('disconected');
    }, 600000);

  
    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });
  });


  app.get("/genQR", function (req, res) {
    res.render("testsocket");
  });

  function test(io, id) {

    io.sockets.emit("Server-send-data", id + "888");

    new Promise((resolve, reject) => {
      resolve({
        err: 1,
        msg: "complete_all_information_please"
        // 'Quý Khách chưa nhập đủ thông tin'
      })
    })
  }
  app.get("/test", function (req, res) {
    //io.sockets.emit("Server-send-data", socket.id + "888");
    // res.render("test");
    res.send("nhungpham");
  });



  genQR = (io, id) => {
    return new Promise((resolve, reject) => {
      let expire = moment().add(config.TOKEN_EXPIRE, 'minutes')
      let code = utils.randomString('WEB_', 10);
      models.codeWeb.create({
        code: code,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiredAt: expire,
        socketId: id

      }).then(res => {
        if (res) {
          io.sockets.emit("qrcode", res.code);

          resolve({
            err: 0,
            data: code
          })
        }
        else {
          resolve({
            err: 1,
            msg: "Can't find data"
          })
        }
      })
    })
  },

    verifyQRWeb = (qrcode, io) => {
      return new Promise((resolve, reject) => {
        if (!qrcode) {
          resolve({
            err: 1,
            msg: "Invalid parameter"
          })
        }
        else {

          models.codeWeb.findOne({ where: { code: qrcode, status: 1 } }).then(function (res) {
            if (res) {
              io.sockets.emit("token", res);

              resolve({
                err: 0,
                data: res.token
              })
            }
            else {
              resolve({
                err: 2,
                msg: "Can't find data"
              })
            }
          })
        }
      })
    }

  return { verifyQRWeb: test };
}
