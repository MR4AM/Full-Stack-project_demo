const db = require('../db');
const apiResult = require('../utils/apiResult')

module.exports = {
    register(app){
        app.post('/login',(req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            db.mongodb.select('users', {username, password}).then((result) => {
                if(result.length > 0){
                    req.session.username = username;
                }
                res.send(apiResult(result && result.length > 0));
            })
        })
    }
}