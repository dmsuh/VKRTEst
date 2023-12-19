import { HttpException, HttpStatus } from '@nestjs/common';

export class AttributeGroupNotFoundException extends HttpException {
  constructor() {
    super('Attribute group not found', HttpStatus.NOT_FOUND);
  }
}
