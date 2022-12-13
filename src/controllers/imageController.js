const uploadImage = (req, res) => {
    const imageUrl = req.imageUrl;
    
    res.status(200).json({
        success: true,
        message: "Image uploaded.",
        url: imageUrl
    })
}

module.exports = uploadImage;