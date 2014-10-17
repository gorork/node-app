var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    email   : {
        type      : String,
        required  : true
    },
    name    : String,
    isAdmin : Boolean
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

