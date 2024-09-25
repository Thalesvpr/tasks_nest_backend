import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseResult } from "./base.result";

export class ControllerResult<T> extends BaseResult<T> {
    public statusCode: HttpStatus;


    constructor(data: T | null, statusCode: HttpStatus = 200) {
      super(data);
      this.statusCode = statusCode;
    }
    static success<U>(data: U, statusCode = HttpStatus.OK): ControllerResult<U> {
      return new this(data, statusCode);
    }
  }