const Stream = require('../models/streamModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllStreams = catchAsync(async (req, res, next) => {
  const stream = await Stream.find();

  res.status(200).json({
    status: 'success',
    data: stream,
  });
});

exports.getStream = catchAsync(async (req, res, next) => {
  const stream = await Stream.findOne({ _id: req.params.id });

  // if there is no employee with that id
  if (!stream) {
    return next(new AppError(`No Stream with that ID`, 404));
  }

  const { mainStreamURL, streamsURL } = stream;

  res.status(200).json({
    status: 'success',
    data: {
      streamsURL,
      mainStreamURL,
    },
  });
});

exports.addStream = catchAsync(async (req, res, next) => {
  const stream = await Stream.create(req.body);

  console.log('req.body: ', req.body);

  res.status(201).json({
    status: 'success',
    data: {
      stream,
    },
  });
});

exports.updateStream = catchAsync(async (req, res, next) => {
  const stream = await Stream.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // handle error if there is no embloyee with that id
  if (!stream) {
    return next(new AppError(`No Stream found with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      stream,
    },
  });
});
