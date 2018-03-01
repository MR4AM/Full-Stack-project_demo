const db=require('../db')
module.exports={
    render:(app)=>{
        app.get('/getproducts',(req,res)=>{
             function productCheck(dbname,params,res){
                db.mongodb.select(dbname, params).then((data) => {
                        res.send(data);
                    }).catch((error) => {
                        res.send({status: false, error});
                    });
            }
            productCheck('product',{},res);
        })
        // 增加产品信息
         app.post('/saveproduct',(req,res)=>{
            let id = req.body.id;
            let name = req.body.name;
            let price = req.body.price;
            let color = req.body.color;
            let product_arr={
                "id":id,
                "name":name,
                "price":price,
                "color":color
            };
            db.mongodb.insert('product',product_arr);
        })
         // 删除产品信息
          app.post('/delproduct',(req,res)=>{
            let id = req.body.id;
            db.mongodb.delete('product',{"id":id});
        })
    }
}