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
  console.log('req.body ------------- : ', req.body);

  const { imageId, arriveAt, imageDescription } = req.body;

  const imageDetails = {
    imageName: req.files[0].originalname,
    imageTitle: req.files[0].fieldname,
    url: result.url,
    imageId,
    imageDescription,
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

// exports.getImage = async (req, res) => {
//   const images = await ImageModel.find({ imageId: req.params.id });

//   res.status(200).json({
//     status: 'success',
//     images,
//   });
// };

exports.getAllImage = async (req, res) => {
  const images = await ImageModel.find();

  res.status(200).json({
    status: 'success',
    images,
  });
};

exports.getImage = async (req, res) => {
  let images;
  if (req.params.id === 'today') {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const startDate = new Date(
      `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}T00:00:00.000Z`
    );
    const endDate = new Date(
      `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}T23:59:59.999Z`
    );

    images = await ImageModel.find({
      arriveAt: { $gte: startDate, $lt: endDate },
    });
  } else {
    images = await ImageModel.find({ imageId: req.params.id });
  }

  res.status(200).json({
    status: 'success',
    images,
  });
};
