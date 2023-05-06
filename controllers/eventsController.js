const Event = require('../models/eventsModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Event.find(), req.query)
    .filter()
    .sort()
    .fildLimit()
    .paginat();
  const events = await features.query;

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events,
    },
  });
});

exports.addEvent = async (req, res) => {
  // console.log('----', req.body);

  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getEvents = catchAsync(async (req, res, next) => {
  const [day, month, year] = req.params.id.split('-');

  const query = {
    arriveAt: {
      $gte: new Date(`${year}-${month}-${day}`),
      $lt: new Date(`${year}-${month}-${day}T23:59:59.999Z`),
    },
  };

  const events = await Event.find(query);

  const typeCounts = {
    smoke: 0,
    unauthorized: 0,
    fight: 0,
    phone: 0,
    ppe: 0,
  };

  events.forEach((event) => {
    const { type } = event;
    if (typeCounts[type] !== undefined) {
      typeCounts[type]++;
    }
  });

  res.status(200).json({
    status: 'success',
    results: events.length,
    typeCounts,
    data: events,
  });
});
