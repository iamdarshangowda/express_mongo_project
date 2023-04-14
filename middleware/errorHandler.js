const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        starckTrace: err.starckTrace,
      });

    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        starckTrace: err.starckTrace,
      });

    case constants.UNAUTHORISED:
      res.json({
        title: "Unauthorised Error",
        message: err.message,
        starckTrace: err.starckTrace,
      });

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden Error",
        message: err.message,
        starckTrace: err.starckTrace,
      });

    case constants.SERVER_ERROR:
      res.json({
        title: "Forbidden Error",
        message: err.message,
        starckTrace: err.starckTrace,
      });

    default:
      break;
  }
};

module.exports = errorHandler;
