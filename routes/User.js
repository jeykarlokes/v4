var express             = require("express"),
    router              = express.Router({mergeParams:true}),
    Master_User         = require('../models/User'),
    product_categories  = require('../load-categories'),
    Cart                = require('../models/Cart'),
    UserDetail          = require("../models/UserDetail")



router.get('/cart',function (req,res)
{
    var name = req.params.name;
    Master_User.find({firstName:name}).populate('carts').exec(function(err,found_cart_items)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(found_cart_items)
            var carts = found_cart_items[0].carts;
            var name = found_cart_items[0].firstName;
            res.render("Cart",{cart_items:carts,name:name});
        }
    })

});

router.get('/address/new',function (req,res)
{
    res.render('Address',{name:req.params.name});
})


router.post('/address', function (req,res)
{
    // console.log(req.body);


    Master_User.find({firstName:req.params.name},function (err,foundUser)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(foundUser)
            const {Name,Address,phone,city,country} = req.body;
            UserDetail.create({name:Name,address:Address,
            phone:phone,city:city,country:country},function (err,Address)
            {
                if (err)
                {
                    console.log(err);
                }
                else{
                    console.log(foundUser)
                    foundUser[0].userdetails.push(Address);
                    foundUser[0].save(function (err,foundUser)
                    {
                        if(err)
                        {
                            console.log(err)
                        }
                        else
                        {
                            console.log('address added successfully');
                        }
                    })
                }
            })
        }

    })
});



module.exports = router;
