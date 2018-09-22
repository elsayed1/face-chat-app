const mongoose = require('mongoose');
const user = require('./user');
Schema = mongoose.Schema;

let postschema = new Schema({
    title   :  { type: String, default: '' },
    subtitle : String,
    post : String,
    state : Boolean,
    createAt : {
        type :Date,
        default : new Date()
    },
    image : {
        type : String ,
        default : 'avatar.jpg'

    },
    user : {type : mongoose.Schema.Types.ObjectId , ref :'user'}
});

let Post = mongoose.model('post', postschema);


module.exports = Post;