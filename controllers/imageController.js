const ImageModel = require('../models/imageModel');
const cloud = require('../cloudinaryConfig');
// const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.postImage = catchAsync(async (req, res, next) => {
  if (!req.files[0]) {
    return next(
      new AppError(
        `You did not add any image or this type of image format does not alowe`,
        404
      )
    );
  }

  if (!req.body.imageId) {
    return next(new AppError(`You did not add imageId`, 404));
  }

  const result = await cloud.uploads(req.files[0].path);

  // console.log('---------------: ', result);
  console.log('req.files ------------- : ', req.files);

  const { imageId, arriveAt } = req.body;

  const imageDetails = {
    imageName: req.files[0].originalname,
    imageTitle: req.files[0].fieldname,
    url: result.url,
    imageId,
    arriveAt,
  };
  const image = new ImageModel(imageDetails);
  image.save();

  // delete image local
  // fs.unlinkSync(req.files[0].path);

  res.json({
    message: 'success',
    image: image,
  });
});

exports.getImage = async (req, res) => {
  const images = await ImageModel.find({ imageId: req.params.id });

  res.status(200).json({
    status: 'success',
    images,
  });
};

exports.getAllImage = async (req, res) => {
  const images = await ImageModel.find();

  res.status(200).json({
    status: 'success',
    images,
  });
};
