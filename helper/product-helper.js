var db=require('../config/connection')

module.exports={

    addProduct:(Products,callback)=> {

        db.get().collection('products').insertOne(Products).then((data)=>{
            callback(data.ops[0]._id)
        })
    },

    addCategory:(categories,callback)=> {

        db.get().collection('categories').insertOne(categories).then((data)=>{
            callback(data.ops[0]._id)
        })
    }
}