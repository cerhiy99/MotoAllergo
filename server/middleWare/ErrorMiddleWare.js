const ErrorApi = require('../error/ErrorApi.js');

const middleware = (err, req, resp, next) => {
  if (err instanceof ErrorApi) {
    return resp.status(err.code).json({ message: err.message });
  }
};

module.exports = middleware;
