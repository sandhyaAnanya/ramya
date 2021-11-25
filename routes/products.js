   const express = require('express')
   const router = express.Router()
   const products = [{
    _id:1,
    pName:'Bag',
    pDesc:'Wearable',
    pPrice:1200
}]


const product = require('../models/product')
 router.get('/products',async(req,res)=>{
  try {
  const products = await product.find().lean();
    res.render('./products.handlebars',{
        products,
    });
   }catch(err){
    res.redirect('/error')
  }
 });

 router.get('/add-product',(req,res)=>{
    res.render('./add-product.handlebars')
})


 router.post('/add-product',async (req,res)=>{
    console.log(req.body);
    let {pName,pDesc,pPrice}=req.body
     pPrice = parseInt(pPrice);
     try{
         await product.insertMany([
             {
                pName,
                pDesc,
                pPrice  
             },{
                 runValidators:true
             }
         ]);

         res.redirect('/products/products')
     }catch(err){
         console.log(err);
         res.redirect('/error')
     }
});

 router.get('/edit-product/:_id',(req,res)=>{
    // console.log(req.query._id);

    console.log(req.params._id);
    const index = products.findIndex((product)=>{
        return parseInt(product._id)===parseInt(req.params._id)
    })
    const selectedProduct = products[index]
    res.render('./edit-product.handlebars',{
        selectedProduct
    })

})
 router.post('/edit-product',(req,res)=>{
    console.log(req.body);
    let {_id,pName,pDesc,pPrice}=req.body
    _id =parseInt(_id)
    pPrice=parseInt(pPrice)
    const index = products.findIndex((product)=>{
        return parseInt(product._id) === parseInt(req.params._id)
    })
    products.splice(index,1,{_id,pName,pDesc,pPrice})
    res.redirect('/products/products')
})

 router.get('/delete-product/:_id',(req,res)=>{
    const _id = req.params._id
    const index = products.findIndex((product)=>{
        return parseInt(product._id)===parseInt(_id)
    })
    products.splice(index,1)
    res.redirect('/products/products')
})

module.exports = router

