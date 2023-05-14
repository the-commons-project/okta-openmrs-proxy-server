export default class Response {
  static succesMessage(res, message, data = null, status, total = null) {
    return res.status(status).json(
      data
        ? {
            status,
            result: data.length,
            total: total || data.length,
            message,
            data,
          }
        : { status, message }
    );
  }

  static errorMessage(res, error, status) {
    return res.status(status).json({
      status,
      error,
    });
  }
}
