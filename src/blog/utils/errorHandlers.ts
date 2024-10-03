const STATUS_ERROR = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTORIZED_ERROR: 403,
  INTERNAL_ERROR: 500,
};

class BaseError extends Error {
  public statusCode: number;
  constructor(name: string, statusCode: number, desc: string) {
    super(desc);
    this.name = name;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ApiError extends BaseError {
  constructor(desc = "Api Error") {
    super("Api Error", STATUS_ERROR.INTERNAL_ERROR, desc);
  }
}

export class NotFoundError extends BaseError {
  constructor(desc = "Not Found") {
    super("Not Found", STATUS_ERROR.NOT_FOUND, desc);
  }
}

export class BadRequestError extends BaseError {
  constructor(desc = "Bad Request") {
    super("Bad Request", STATUS_ERROR.BAD_REQUEST, desc);
  }
}

export class UnAuthorizedError extends BaseError {
  constructor(desc = "Access denied") {
    super("Access denied", STATUS_ERROR.UNAUTORIZED_ERROR, desc);
  }
}
