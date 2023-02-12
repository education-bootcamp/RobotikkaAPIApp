const mongoose= require('mongoose');
const OrderSchema = new mongoose.Schema({
    cost:{type:Number, required:true},
    date:{type:Date, required:true},
    customer:{type:Object, required:true},
    products:{type:Array}
});
module.exports = mongoose.model('Order', OrderSchema);