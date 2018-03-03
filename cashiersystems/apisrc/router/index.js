const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bp = require('body-parser');
const session = require('express-session');

const userRouter = require('./users')
const productRouter = require('./product');
const orderRouter = require('./order');
const ioserverRouter = require('./ioserver')

app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/websrc')));
app.use(bp.urlencoded({extended: false}));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

module.exports = {
    start(_port){

        userRouter.register(app);
        productRouter.register(app);
        orderRouter.register(app);
        ioserverRouter.startio(io);
        http.listen(_port || 8080);
    }
}