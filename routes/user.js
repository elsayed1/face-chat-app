const router = require('express').Router();
const user = require('../models/user');


router.get('/register' , (req ,res)=>{
    let Erro = null;

    res.render('layout/register' , {Erro});



});

router.get('/login' , (req ,res)=>{
    if(req.session.userid)
     return   res.redirect('/');
    res.render('layout/login' );

});

router.post('/register' , (req ,res)=>{

   new user(req.body).save()
       .then(result=> res.redirect('/'))
       .catch(err=>{
           console.log(Object.keys(err.errors).map(key=> err.errors[key].message))
         let   Erro = Object.keys(err.errors).map(key=> err.errors[key].message);
           res.render('layout/register' ,{Erro})
       });


});

router.post('/login' ,(req , res)=>{
    if (req.body.username && req.body.password){
        user.authenticate(req.body.username , req.body.password , (err , user)=>{
            if (err){
                console.log(err);

            }else {
                req.session.userid = user._id.toString();
                req.session.username = user.username;
                return res.redirect('/');
            }
        })
    }
});

router.get('/logout', (req,res)=>{

   req.session.destroy(err=>{
       if (err)
           return err;
       res.redirect('/users/login')

   })
});

router.get('/profile' , (req ,res)=>{
    res.render('layout/profile');


});
module.exports = router;