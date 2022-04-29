const AppError = require('@services/AppError');

const handleThisError = (err) => new AppError(err.message, 400);

const sendErrorProd = (error, req, res) => {
  if (error.isOperational) {
    console.log({ error });
    res.status(error.statusCode).render('errors/error', {
      errorMsg: error.message,
      errorStatusCode: error.statusCode,
      title: 'Error',
      layout: false,
    });
  } else {
    console.log({ error });
    res.status(error.statusCode).render('errors/error', {
      errorMsg: 'somthing went wrong!',
      title: 'Error',
      errorStatusCode: error.statusCode,
      layout: false,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    // in development envirement
    console.log({ err });
    res.status(err.statusCode).render('errors/error', {
      errorMsg: err.message,
      errorStatusCode: err.statusCode,
      title: 'Error',
      layout: false,
    });
  } else if (process.env.NODE_ENV === 'production') {
    // in production envirement

    let error = { ...err };
    Object.setPrototypeOf(error, Object.getPrototypeOf(err));
    // operational Errors
    if (err.code === 'someThing') error = handleThisError(err);

    sendErrorProd(error, req, res);
  }
};
