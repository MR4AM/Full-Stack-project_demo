const mongo = require('mongodb').MongoClient;

var db

mongo.connect('mongodb://localhost:27017', (_error, _db) => {
    if(_error){
        console.log(_error);
    } else {
        db = _db;
    }
});


module.exports = {
    select(_collection, _condition){
        return new Promise((resolve, reject) => {
            db.db('jason').collection(_collection).find(_condition || {}).toArray((error, result) => {
                resolve(result);
            })
        })
    },
    insert: (_collection, _data) => {
        return new Promise((resolve, reject) => {
            db.db('jason').collection(_collection).insert(_data).then((result, error) => {
                resolve(result);
            })
        })
    },
    delete: (_collection, _condition) => {
        return new Promise((resolve, reject) => {
            db.db('jason').collection(_collection).remove(_condition).then((result, error) => {
                resolve(result);
            })
        })
    },
    objectid: (_id) => {
        return _id ? new ObjectID(_id) : new ObjectID();
    },
    update:(_collection,pro_id,new_arr)=>{
         var whereData = pro_id;
         var updateData ={$set:new_arr}; //如果不用$set，替换整条数据
         db.db('jason').collection(_collection).update(whereData, updateData, function(error, result){
            if (error) {
              console.log('Error:'+ error);
            }else{
            }
        })
    },
}