const db = require('../db');
const apiResult = require('../utils/apiResult')
const filter = require('../utils/filter')

module.exports = {
    register(app){
        app.post('/cashier',filter, (req, res) => {
            let barcode = req.body.barcode;
            db.mongodb.select('products', {barcode}).then((result) => {
                if(result && result.length > 0){
                    res.send(apiResult(true, result))
                } else {
                    res.send(apiResult(false));
                }
            })
        })
        app.get('/order',(req,res)=>{
            let orderno=req.query.orderno*1;
            db.mongodb.select('order',{"orderno":orderno}).then((result)=>{
                 res.send(result);
            })
        })
    }
}