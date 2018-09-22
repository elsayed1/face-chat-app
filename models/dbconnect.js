const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/postsApp' , {useNewUrlParser : true })
.then(db=>console.log('connected to the DB'))
.catch(err=> console.log('cannt connect to DB' , err.message));

module.exports = {mongoose};