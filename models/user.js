const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const userSchema =new mongoose.Schema({
    username : {
        type: String,
        required: [true,'please provide your username'],
        unique: [true,'this username already exist'],
    },
    password: {
        type: String,
        required: [true,'please provide your password'],
    },
    email : {
        type :String,
        required : [true,'please provide your email'],
    },
    phone : {
        type : Number
    },
    image : {
      type : String,
      default : 'avatar.jpg'
    },
    post : [{type :mongoose.Schema.Types.ObjectId , ref : 'post'}]
});
// hasing the password befor saving it
userSchema.pre('save' ,function(next){
    var user = this ;
    bcrypt.hash(user.password , 10 , function (err , hash) {
        if(err)
            return next(err);
        user.password= hash;
        next();
    })
});

//authenticate inputs against database



userSchema.statics.authenticate = function (username, password, callback) {
    var user = this;
    user.findOne({ username: username })
        .exec(function (err, user) {

            if (err) {
                return callback(err)
            } else if (!user) {
                 err = new Error('User not found.');
                err.status = 401;
                return callback(err );
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    return callback(null, user);
                } else {
                     err = new Error('Wrong password');
                    err.status = 401;
                    return callback(err);
                }
            })
        });
};
var user = mongoose.model('user' , userSchema);

module.exports =  user;

