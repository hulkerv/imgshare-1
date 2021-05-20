const {
    Comment,
    Image
} = require('../models');

async function imageCounter() {
    
   return await Image.countDocuments();

};

async function commentsCounter() {
    
    return await Comment.countDocuments();
};

async function imageTotalViewsCounter() {
        let result = await Image.aggregate([{
            $group: {
                _id: '1',
                viewsTotal: {
                    $sum: '$views'
                }
            }
        }]);
        const imgCount = await Image.countDocuments();
        if(imgCount > 0 ){
            return result[0].viewsTotal;
        }else{
           result = [0];
            return result[0];
        }
};

async function likesTotalCounter() {
        let result = await Image.aggregate([{
            $group: {
                _id: '1',
                likesTotal: {
                    $sum: '$likes'
                }
            }
        }]);
    const imgCount = await Image.countDocuments();
        if(imgCount > 0 ){
            return result[0].likesTotal;
        }else{
           result = [0];
            return result[0];
        }
};


module.exports = async () => {
    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]);

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}
