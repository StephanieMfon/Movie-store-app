export class NotfoundError extends Error {
  constructor(message) {
    super(message);
    (this.status = 404), (this.errorType = "NotFoundError");
  }
}

export class BadUserRequestError extends Error {
  constructor(message) {
    super(message);
    (this.status = 404), (this.errorType = "BadUserRequestError");
  }
}

// Add unauthorized error extended class
