const router = require('express').Router();
let Product = require('../models/products.model');
var productHelper = require('../helper/product-helper')

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {

    productHelper.addProduct(req.body,(id)=>{
        let img = req.files.img
        img.mv('./public/product-image/'+id+'.jpg',(err,done)=>{
            if(!err){
                res.redirect('http://localhost:5000/admin/product')
            }else {
                console.log(err);
            }
        })
    })
})

module.exports = router;