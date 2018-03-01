// 引入数据库文件夹
const db=require('../db');
module.exports={
    // 登录时查询
    register:(app)=>{
         function userCheck(dbname,params,res){
             db.mongodb.select(dbname, params).then((data) => {
                if(data[0]){
                    res.send({status: true});
                    console.log(data);
                    return false;
                }else {
                    res.send({status: false, message: '登陆信息错误'});
                }
            }).catch((error) => {
                res.send({status: false, error});
            });
        }
        // 登录查询数据库
        app.post('/login', (req, res) => {
            let name = req.body.username;
            let pwd = req.body.pwd;
            // "password":pwd
            userCheck('test',{"name":name},res);
        })
        // 注册前先查询数据库是否存在用户名
        app.post('/check',(req,res)=>{
            let name=req.body.username;
            userCheck('test',{name},res);
        })
        // 注册时将用户信息添加到数据库
        app.post('/register',(req,res)=>{
            let name = req.body.username;
            let pwd = req.body.pwd;
            let phone=req.body.phone;
            let user_arr={
                "name":name,
                "password":pwd,
                "phone":phone
            };
            // 查询数据库是否存在用户名，不存在则添加用户
             db.mongodb.select('test', {name}).then((data) => {
                if(data[0]){
                    res.send({status: true});
                    return false;
                }else {
                    res.send({status: false, message: '登陆信息错误'})
                    db.mongodb.insert('test',user_arr);
                }
            }).catch((error) => {
                res.send({status: false, error});
            });
        })
    }
}