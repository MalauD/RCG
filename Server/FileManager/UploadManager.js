var multer = require('multer');
var path = require('path');
var uuid = require('uuid');

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, '/home/pi/RCGWebsite/Public/FoodImage/');
	},
	filename: function(req, file, callback) {
		console.log(req.path);
		if (req.path == '/Create')
			callback(null, uuid.v4() + file.originalname);
		else if (req.path == '/User/Update/') {
			req.session.hash
				? callback(null, uuid.v4() + file.originalname)
				: callback('[Multer] Invalid credential to save image');
		} else callback('[Multer] Invalid multer path');
	}
});

function fileFilter(req, file, cb) {
	var ext = path.extname(file.originalname);
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
		return cb(new Error('File is not an image'));
	}
	cb(null, true);
}

var UploadMulter = multer({
	fileFilter,
	storage,
	limits: {
		fileSize: 2048 * 2048
	}
});

module.exports = UploadMulter;
