const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
//set storage engine
const storage = multer.diskStorage({

destination:'./public/uploads',
filename: function(req,file,cb){

cb(null,file.fieldname +  '-' + Date.now() + path.extname(file.originalname));

}
});

//init upload
const upload = multer({

	storage: storage,
	limits: {filesize:1000000},
	fileFilter: function(req,file,cb)
	{
		checkFileType(file,cb);
	}

}).single('myImage'); //single image

function checkFileType(file,cb){

const filetypes = /jpeg|jpg|png|gif/;
const extname=filetypes.test(path.extname(file.originalname).toLowerCase());

//check mimetype 
const mimetype =filetypes.test(file.mimetype);

//make sure both are true

if (mimetype && extname){
return cb(null,true);
}
else
{
	cbb("Error:images only");
}
};
const app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));


app.get('/',function(req,res){


	res.render('inde');
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('inde', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('inde', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

app.listen(3000,function(req,res){

console.log("you are listening to port 3000");

});