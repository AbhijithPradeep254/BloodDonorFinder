const mongoose = require('mongoose');
const inc = require('mongoose-sequence')(mongoose);

//mongoose.connect('mongodb+srv://user1:user1@ictakfiles.9kgyw.mongodb.net/blooddonor?retryWrites=true&w=majority');
mongoose.connect('mongodb://localhost:27017/blooddonor');

const Schema = mongoose.Schema;
var reqSchema = new Schema({
    email: String,
    request: String,
    date: String,
    city: String,
    state: String,
    phone: Number,
});

reqSchema.plugin(inc, {inc_field: 'sno'});
var reqData = mongoose.model('reqdatas', reqSchema, 'reqdatas');

module.exports = reqData;


