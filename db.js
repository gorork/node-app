var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

mongoose.set('debug', true);

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:   {
        type:     String,
        required: true
    },
    name:    String,
    isAdmin: Boolean
});

userSchema.methods.speak = function() {
    var greeting = this.name
        ? "I am " + this.name
        : "I don't have a name";
    console.log(greeting);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
