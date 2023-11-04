export const StatusCode = {
  Ok: 200,
  Created: 201,
  Accepted: 204,

  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  MisdirectedRequest: 421,
  TooManyRequests: 429,

  InternalServerError: 500,
  BadGateway: 502,
} as const;

export class CustomError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);

    this.name = this.constructor.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(public reason?: string) {
    super("Bad Request", StatusCode.BadRequest);
  }
}

export class UnauthorizedError extends CustomError {
  constructor() {
    super("Unauthorized", StatusCode.Unauthorized);
  }
}

export class ForbiddenError extends CustomError {
  constructor() {
    super("Forbidden", StatusCode.Forbidden);
  }
}

export class NotFoundError extends CustomError {
  constructor() {
    super("Not Found", StatusCode.NotFound);
  }
}

export class TooManyRequestsError extends CustomError {
  constructor(public error: Error) {
    super("Too Many Requests", StatusCode.TooManyRequests);
  }
}

export class InternalServerError extends CustomError {
  constructor() {
    super("Internal Server Error", StatusCode.InternalServerError);
  }
}
