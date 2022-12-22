class ApiError extends Error {
  [x: string]: any;

  constructor(status: any, message: any) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: any) {
    return new ApiError(404, message);
  }

  static internal(message: any) {
    return new ApiError(500, message);
  }

  static unauthorized(message: any) {
    return new ApiError(401, message);
  }

  static forbidden(message: any) {
    return new ApiError(403, message);
  }
}

export default ApiError;
