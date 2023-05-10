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

exports.getEventsForYear = catchAsync(async (req, res, next) => {
  const year = req.params.year;

  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

  const query = {
    arriveAt: { $gte: startDate, $lt: endDate },
  };

  const events = await Event.find(query);

  const countObj = {};
  events.forEach((event) => {
    countObj[event.type] = (countObj[event.type] || 0) + 1;
  });

  res.status(200).json({
    status: 'success',
    results: events.length,
    types: countObj,
    data: events,
  });
});

exports.getEventsForMonth = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;

  const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-${month}-31T23:59:59.999Z`);

  const query = {
    arriveAt: { $gte: startDate, $lt: endDate },
  };

  const events = await Event.find(query);

  const countObj = {};
  events.forEach((event) => {
    countObj[event.type] = (countObj[event.type] || 0) + 1;
  });

  res.status(200).json({
    status: 'success',
    results: events.length,
    types: countObj,
    data: events,
  });
});

exports.getEventsForDay = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;

  const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  const endDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

  const query = {
    arriveAt: { $gte: startDate, $lt: endDate },
  };

  const events = await Event.find(query);

  const countObj = {};
  events.forEach((event) => {
    countObj[event.type] = (countObj[event.type] || 0) + 1;
  });

  res.status(200).json({
    status: 'success',
    results: events.length,
    types: countObj,
    data: events,
  });
});
