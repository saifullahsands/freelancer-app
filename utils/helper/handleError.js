function okResponse(res, status, message, data, token = null) {
  const response = {
    success: true,
    status,
    message,
    data,
    token,
  };

  return res.status(status).json(response);
}

function errorHandler(res, status, message, data = null) {
  const response = {
    success: false,
    status,
    message,
    data,
  };

  return res.status(status).json(response);
}

function BadRequestError(res, message = "Invalid Client Request") {
  const status = 400;
  const response = {
    success: false,
    message,
  };

  return res.status(status).json(response);
}

function unAuthorizedError(res, message = "Auth required/failed") {
  const status = 401;
  const response = {
    success: false,
    message,
  };

  return res.status(status).json(response);
}

function ForbiddenError(res, messsage = "User doesn't have permission") {
  const status = 403;
  const response = {
    success: false,
    messsage,
  };

  return res.status(status).json(response);
}

function NotFoundError(res, message = "Resource not found") {
  const status = 404;
  const response = {
    success: false,
    message,
  };

  return res.status(status).json(response);
}

function ConflictError(res, message = "Duplicate data / conflict") {
  const status = 409;
  const response = {
    message,
    success: false,
  };

  return res.status(status).json(response);
}

function validationError(res, message = "Data validation failed") {
  const status = 422;
  const response = {
    success: false,
    message,
  };

  return res.status(status).json(message);
}

module.exports = {
  validationError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
  okResponse,
  errorHandler,
  BadRequestError,
  unAuthorizedError,
};