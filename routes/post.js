const router = require('express').Router();
const Post = require('../models/post');



router.get('/create' , (req ,res)=>{
    if(req.session.userid) {
        res.render('layout/createPost');
    }else
        res.redirect('/users/login')
});


router.post('/create'  ,(req ,res)=>{

    let post = new Post({
        title : req.body.title,
        post : req.body.post,
        image : req.file.filename,
        user : req.session.userid
    });
    post.save().then(result=>res.redirect('/'))
        .catch(err=>console.log(err));
    console.log(post);

});
router.get('/:id' , (req ,res)=>{

    Post.findById(req.params.id).populate('user')
        .then(post=>{res.render('layout/post' , {post});

        })
        .catch(err=>console.log('nosuch post or has been delted '));
});

router.get('/delete/:id',(req,res)=>{
   Post.findByIdAndDelete(req.params.id).then(done=> res.redirect('/'))
       .catch(err=>console.log(err));
});


//
// app.get('/post',async (req,res)=>{
//     let query = req.query;
//     const posts = await post.findById(query.id);
//     if (posts){
//         res.render('layout/post' , {
//             posts
//         });
//     }else {
//         res.render('layout/create');
//     }
// });
// app.get('/delete',async (req,res)=>{
//     // let query = require('url').parse(req.url,true).query;
//     const posts = await post.findById(req.query.id);
//     console.log(req.query);
//
//     if (posts){
//         post.deleteOne({'_id': req.query.id},(r,e)=>{});
//         res.render('layout/create');
//     }else {
//         res.render('layout/create');
//     }
// });


// app.post('/new',(req,res)=>{
//     console.log(req.body);
//
//     post.create({
//         ...req.body
//     },(err , res)=>{
//         console.log(err , res);
//     });
//     res.redirect('/');
// });
module.exports = router;