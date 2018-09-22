const post = require("../models/post");
const router = require('express').Router();



router.get('/' , (req ,res)=> {
    if (req.session.userid) {

    const posts = post.find().populate('user').exec()
        .then(posts => {

            res.render('layout/index', {posts})

        })
        .catch(err => console.log(err));
    }else
        res.redirect('/users/login')
});

module.exports = router;