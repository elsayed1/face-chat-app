const express = require ('express');
const bodyparser = require("body-parser");
const session = require('express-session');
const _ = require("lodash");
const multer = require('multer');
const connectMongo = require ('connect-mongo');
const ejs = require('ejs');

var usersStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});

var postsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
var upposts = multer({ storage: usersStorage });
var upusers = multer({ storage: postsStorage });


const {mongoose} = require('./models/dbconnect');
const mongoStore = connectMongo(session);

const  app =  express();



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({secret :'some secret' ,
    resave:false ,
    saveUninitialized :true,
    store : new mongoStore({
        mongooseConnection : mongoose.connection
    })
}));



app.use((req , res , next)=>{
    res.locals.userid = null;
    if(req.session.userid){
        res.locals.userid = req.session.userid;
        res.locals.username = req.session.username;
    }

    next();
});


//routes
const homeRouter = require("./routes/home");
const createUserRouter = require('./routes/user');
const postsRouter = require('./routes/post');


// this is the normal way
/*app.get('/',(req,res)=>{
   res.sendFile(path.resolve(__dirname , 'pages/index.html'));
});
*/

app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/users', upusers.single('avatar'),createUserRouter);
app.use('/post',upposts.single('avatar'), postsRouter);

app.get('/contact',(req,res)=>{
    res.render('layout/contact');
});








app.listen(3000);