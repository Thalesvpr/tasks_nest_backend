import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundServiceError extends HttpException {
  constructor(message: string = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ConflictServiceError extends HttpException {
  constructor(message: string = 'Conflict occurred') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class UnauthorizedServiceError extends HttpException {
  constructor(message: string = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class BadRequestServiceError extends HttpException {
  constructor(message: string = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}