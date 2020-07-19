var express             = require("express"),
    router              = express.Router({mergeParams:true}),
    Master_User         = require('../models/User'),
    product_categories  = require('../load-categories'),
    Item                = require('../models/Item'),
    Cart                = require('../models/Cart'),
    UserDetail          = require("../models/UserDetail")




router.get('/',function (req,res)
{
    Item.find({},function (err,item)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.render('Fashion',{items:item})
        }
    })
})



router.get('/add-to-cart/:id',function (req,res)
{
    var id = req.params.id;
    Master_User.find(
        {firstName:'lokesh'},function (err,foundUser)
        {
        if(err)
        {
            console.log(err);
        }
        else
        {
            Item.findById(id,"name price desc image" ,function (err, foundItem)
            {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    Cart.create({
                            name:foundItem.name,
                            price:foundItem.price,
                            desc:foundItem.desc,
                            image:foundItem.image
                    },function (err,cart)
                    {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        foundUser[0].carts.push(cart)
                        foundUser[0].save(function (err,data)
                        {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {

                            // console.log("the final",data)
                            res.redirect(`/user/${foundUser[0].firstName}/cart`);
                        }
                     })
                    }
                })
                }

            })
        }
    })
})

module.exports = router;
