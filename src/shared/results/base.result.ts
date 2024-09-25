import { HttpException, HttpStatus } from "@nestjs/common";

export class BaseResult<T> {
    public data: T | null;
  
    constructor(data: T | null) {
      this.data = data;
    }
  
    static success<U>(data: U): BaseResult<U> {
      return new this(data);
    }
  
    static failure<U>(error: HttpException): BaseResult<null> {
       throw error
    }
  }
  