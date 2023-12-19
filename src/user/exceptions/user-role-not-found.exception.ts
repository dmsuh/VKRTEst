import { HttpException, HttpStatus } from '@nestjs/common';

export class UserRoleNotFoundException extends HttpException {
  constructor() {
    super('User Role not found', HttpStatus.NOT_FOUND);
  }
}
