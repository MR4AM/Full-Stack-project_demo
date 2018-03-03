const filter = require('../utils/filter')
const db = require('../db')

module.exports = {
    register(app){
        app.post('/generateorder', (req, res) => {
            let pros = JSON.parse(req.body.pros);
            let total = 0;
            for(let item of pros){
                total += item.price*1;
            }
            let order = {
                orderno: parseInt(Math.random() * 1000000),
                total,
                status: 0,
                products: pros
            }
            db.mongodb.insert('order', order).then((result) => {
                res.send(result);
            })
        })
        app.post('/updateorder',(req,res)=>{
            let orderno=req.body.orderno*1;
            let status=req.body.status*1;
            db.mongodb.update('order',{"orderno":orderno},{"status":status},function(result){
                res.send(result);
            });
        })
    }
}