const Frame = require('../models/framesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllFrames = catchAsync(async (req, res, next) => {
  const frames = await Frame.find();

  res.status(200).json({
    status: 'success',
    result: frames.length,
    data: {
      frames,
    },
  });
});

exports.createFrames = catchAsync(async (req, res, next) => {
  const frame = await Frame.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      frame,
    },
  });
});

exports.deleteFrames = catchAsync(async (req, res, next) => {
  const frame = await Frame.findByIdAndDelete(req.params.id);

  if (!frame) {
    return next(new AppError(`No frame found with that ID`));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
