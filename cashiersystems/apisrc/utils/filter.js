const apiResult = require('./apiResult')

module.exports = function(req, res, next){
    if(req.session.username){
        next();
    } else {
        res.send(apiResult(false, null, null, 'unauthorized'))
    }
}