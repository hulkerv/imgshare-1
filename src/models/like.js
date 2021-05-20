const mongoose = require('mongoose');
const {Schema} =  mongoose;

const Like = new Schema({
    image_id:{type: String},
    userlike_id:{type: String},
    userImage_id:{type: String},
    timestamp: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', ImageSchema);
