const router = require('express').Router();
let Category = require('../models/category.model');
var productHelper = require('../helper/product-helper')

router.route('/').get((req,res) => {
    Category.find()
    .then(category => res.json(category))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    // const categoryName = req.body.categoryName;

    // const newCategory = new Category({
    //     categoryName
    // });

    // newCategory.save()
    // .then(() => res.redirect('http://localhost:5000/admin/category'))
    // .catch(err => res.status(400).json('Error: ' + err))

    productHelper.addCategory(req.body,(id)=>{
        let img = req.files.img
        img.mv('./public/category-image/'+id+'.jpg',(err,done)=>{
            if(!err){
                res.redirect('http://localhost:5000/admin/category')
            }else {
                console.log(err);
            }
        })
    })
});

module.exports = router;