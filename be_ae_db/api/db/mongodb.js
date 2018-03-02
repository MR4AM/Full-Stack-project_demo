// 引入mongodb
const mongodb=require('mongodb');
const client = mongodb.MongoClient;
const url='mongodb://localhost:27017';
const ObjectID=mongodb.ObjectID;
var db=null;
// 连接mongodb数据库
client.connect(url,(err,_db)=>{
    if(err){
        console.log(err);
        return false;
    }
    db=_db;
})
// 暴露方法(增删查改数据库)
module.exports={
    // 查
    select:(_collection,_condition,_cb)=>{
        if(db){
            return new Promise((resolve, reject) => {
                db.db("user").collection(_collection).find(_condition || {}).toArray((_error, _data) => {
                    if(_error){
                        reject(_error)
                    } else {
                        resolve(_data);
                    }
                })
            })
        }
    },
    // 改
    update:(_collection,pro_id,new_arr)=>{
         var whereData = pro_id;
         var updateData = new_arr; 
         db.db("user").collection(_collection).update(whereData, updateData, function(error, result){
            if (error) {
              console.log('Error:'+ error);
            }else{
              console.log("修改成功");
            }
        })
    },
    // 增
    insert:(_collection,_data)=>{
        db.db("user").collection(_collection).insert(_data,(err,result)=>{
            if(err){
                console.log('Error:'+ err);
            }else{
                console.log("写入成功");
            }
        })
    },
    // 删
    delete:(_collection,_data)=>{
         db.db("user").collection(_collection).remove(_data,(err,result)=>{
            if(err){
                console.log('Error:'+ err);
            }else{
                console.log("删除成功");
            }
        })
    },
    objectid: (_id) => {
        return _id ? new ObjectID(_id) : new ObjectID();
    }
}