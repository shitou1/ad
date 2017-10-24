var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    title:  String,
    postdate: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'}
});

module.exports = mongoose.model('Video', videoSchema);