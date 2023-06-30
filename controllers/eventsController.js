const Event = require('../models/eventsModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ImageModel = require('../models/imageModel');

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

const getEventRequest = (events, res) => {
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
};

const getDate = (params) => {
  const { year, month, day } = params;

  const startDate = new Date(
    `${year}-${month || '01'}-${day || '01'}T00:00:00.000Z`
  );
  const endDate = new Date(
    `${year}-${month || '12'}-${day || '31'}T23:59:59.999Z`
  );

  return {
    arriveAt: { $gte: startDate, $lt: endDate },
  };
};

const eventPlusImagesURLs = async (events) => {
  const eventIds = events.map((event) => event.info.eventId);
  const imageUrls = await ImageModel.find({
    imageId: { $in: eventIds },
  });

  return events.map((event) => {
    const imageUrlsList = imageUrls
      //if there is imageId and eventId both are undefiend so it filter equal true
      .filter((url) => url.imageId && url.imageId === event.info.eventId)
      .map((result) => result.url);

    event.info.imageUrls = imageUrlsList;

    // console.log('imageUrlsList: ', imageUrlsList);
    // console.log('event.info.eventId: ', event.info.eventId);
    // console.log(
    //   'event.info.eventId: ',
    //   imageUrls.map((url) => url.imageId)
    // );

    return event;
  });
};

exports.getEventsForYear = catchAsync(async (req, res, next) => {
  const events = await Event.find(getDate(req.params));

  const eventsReslut = await eventPlusImagesURLs(events);
  getEventRequest(eventsReslut, res);
});

exports.getEventsForMonth = catchAsync(async (req, res, next) => {
  const events = await Event.find(getDate(req.params));

  const eventsReslut = await eventPlusImagesURLs(events);
  getEventRequest(eventsReslut, res);
});

exports.getEventsForDay = catchAsync(async (req, res, next) => {
  const events = await Event.find(getDate(req.params));

  const eventsReslut = await eventPlusImagesURLs(events);
  getEventRequest(eventsReslut, res);
});
