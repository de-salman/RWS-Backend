const mongoClient = require('mongodb').MongoClient
const state={
    db:null
}


module.exports.connect=function(done) {
    const uri = process.env.ATLAS_URI;
    const dbName = 'myFirstDatabase';

    mongoClient.connect(uri,{ useUnifiedTopology: true },(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbName)
        done()
    })

}

module.exports.get=function(){
    return state.db
}