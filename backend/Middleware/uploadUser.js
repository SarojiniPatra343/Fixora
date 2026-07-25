const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'userImage/'); // Folder where files are stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique timestamp
  },
});
const uploadUser = multer({ storage });
module.exports=uploadUser;