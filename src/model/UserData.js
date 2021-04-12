const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://user1:user1@ictakfiles.9kgyw.mongodb.net/blooddonor?retryWrites=true&w=majority');
mongoose.connect('mongodb://localhost:27017/blooddonor');

const Schema = mongoose.Schema;
var userSchema = new Schema({
    name : String,
    email : {type: String, unique: true},
    blood : String,
    phone : {type: Number, unique: true},
    address1 : String,
    address2 : String,
    password : String,
});

var userData = mongoose.model('userdatas', userSchema, 'userdatas');

module.exports = userData;


