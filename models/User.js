var mongoose = require('mongoose');
var UserDetail = require('./UserDetail');
var Order = require('./Order');
var Cart = require('./Cart');

//  auth
var passportLocalMongoose = require("passport-local-mongoose");
// var cartSchema = new mongoose.Schema(
//     {
//         name:String,
//         desc:String,
//         price:Number,
//         image:String,
//         quantity:Number
//     })
var userSchema = new mongoose.Schema(
    {
        username:String,
        // cart:[]
        carts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Cart'
            }],

        userdetails:[
            {
                type:mongoose.Schema.Types.ObjectId,

                ref:'UserDetail'
            }]

        // orders:[
        //     {
        //         type:mongoose.Schema.Types.ObjectId,
        //         ref:'Order'
        //     }]



    });
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);
