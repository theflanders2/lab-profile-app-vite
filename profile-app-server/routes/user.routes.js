const router = require("express").Router();
const mongoose = require("mongoose");

// ********* require USER model in order to use it *********
const User = require("../models/User.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

/*-----PUT UPDATE USER PAGE-----*/
// /api/users/:userId  -  Updates a specific user by id
router.put("/users/:userId", (req, res, next) => {
    const { userId } = req.params;
    const { image } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    User.findByIdAndUpdate(userId, image, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => {
        console.log("Error while updating the user", err);
        res.status(500).json({ message: "Error while updating the user" });
      });
  });

/*-----GET FIND USER PAGE-----*/
// /api/users/:userId -  Retrieves a specific user by id
router.get("/users/:userId", (req, res, next) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    User.findById(userId)
      .then((user) => res.status(200).json(user))
      .catch((err) => {
        console.log("Error while retrieving the user", err);
        res.status(500).json({ message: "Error while retrieving the user" });
      });
  });

/*-----POST IMAGE UPLOAD ROUTE-----*/
// /api/upload => Route that receives the image, sends it
// to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
    console.log('req.file: information pertaining to uploaded image', req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember
    // to use the same when accessing it on the frontend
    
    res.json({ image: req.file.path });
  });

module.exports = router;