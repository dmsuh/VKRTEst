import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUpdateParameterException extends HttpException {
  constructor() {
    super(
      'The "id" parameter passed in the endpoint path does not correspond to the "id" property in the object of the entity being edited',
      HttpStatus.BAD_REQUEST,
    );
  }
}
