// src/shared/exceptions/auth.exceptions.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestAuthError extends HttpException {
  constructor() {
    super('Bad request', HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundAuthError extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class ConflictAuthError extends HttpException {
  constructor() {
    super('Email already in use', HttpStatus.CONFLICT);
  }
}

export class UnauthorizedAuthError extends HttpException {
  constructor() {
    super('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
