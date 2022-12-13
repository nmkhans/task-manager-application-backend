const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public"));
    },
    filename: (req, file, cb) => {
        const filename = path.join(Date.now() + file.originalname);
        const imageUrl = `${process.env.IMAGE_BASE_URL}/public/${filename}`;
        req.imageUrl = imageUrl;
        
        cb(null, filename);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;