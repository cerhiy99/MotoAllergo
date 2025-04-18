class ErrorApi extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }

  static badRequest(err = 'bad request') {
    return new ErrorApi(400, {
      status: 400,
      message: err,
      text: err
    });
  }

  static internalServerError(err) {
    return new ErrorApi(500, {
      status: 500,
      message: 'Internal Server Error',
      text: err
    });
  }

  static unauthorized(err) {
    return new ErrorApi(401, {
      status: 401,
      message: 'Unauthorized',
      text: err
    });
  }

  static forbidden(err) {
    return new ErrorApi(403, { status: 403, message: 'Forbidden', text: err });
  }

  static notFound(err) {
    return new ErrorApi(404, {
      status: 404,
      message: 'Unauthorized',
      text: err
    });
  }
  static noAuth(err) {
    return new ErrorApi(401, {
      status: 401,
      message: 'Authentication Required',
      text: err
    });
  }
}

module.exports = ErrorApi;
