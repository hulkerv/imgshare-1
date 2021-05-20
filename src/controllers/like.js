const {Like, Image} = require('../models');

$('#like-button').click(async function(req, res){
    const image = await Image.find({filename:{
            $regex: req.params.image_id
        }});
    const like = await Like.find({userlike_id:req.user._id, image_id: image._id});
    if(like){
        await like.remove();
        $('#heart').css({'color':'gray'});
        $('#likes').text( await Like.countDocuments);
    }else{
    const newLike = new Like({
        image_id: image._id,
        userlike_id: req.user._id,
        userImage_id: image.user        
    });
    const likeSave = await newLike.save();
    $('#heart').css({'color':'red'});
    $('#likes').text( await Like.countDocuments);
    };
    
})