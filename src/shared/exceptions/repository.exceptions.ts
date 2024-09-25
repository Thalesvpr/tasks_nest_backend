import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundRepositoryError extends HttpException {
  constructor(message: string = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ConflictRepositoryError extends HttpException {
  constructor(message: string = 'Conflict occurred') {
    super(message, HttpStatus.CONFLICT);
  }
}

export class UnauthorizedRepositoryError extends HttpException {
  constructor(message: string = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class BadRequestRepositoryError extends HttpException {
  constructor(message: string = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
