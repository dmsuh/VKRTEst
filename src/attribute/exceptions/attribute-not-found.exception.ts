import { HttpException, HttpStatus } from '@nestjs/common';

export class AttributeNotFoundException extends HttpException {
  constructor() {
    super('Attribute not found', HttpStatus.NOT_FOUND);
  }
}
