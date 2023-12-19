import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotAttachedException extends HttpException {
  constructor() {
    super('File not attached', HttpStatus.BAD_REQUEST);
  }
}
