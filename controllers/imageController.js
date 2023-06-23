const ImageModel = require('../models/imageModel');
const cloud = require('../cloudinaryConfig');
const fs = require('fs');
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

  if (!req.body.eventId) {
    return next(new AppError(`You did not add eventId`, 404));
  }

  const result = await cloud.uploads(req.files[0].path);

  // console.log('---------------: ', result);
  // console.log('result ------------- : ', req.body);

  const { eventId, arriveAt } = req.body;

  const imageDetails = {
    imageName: req.files[0].originalname,
    url: result.url,
    eventId,
    arriveAt,
  };
  const image = new ImageModel(imageDetails);
  image.save();

  // delete image local
  fs.unlinkSync(req.files[0].path);

  res.json({
    message: 'success',
    image: image,
  });
});

exports.getImage = async (req, res) => {
  const images = await ImageModel.find({ eventId: req.params.id });

  res.status(200).json({
    status: 'success',
    images,
  });
};
