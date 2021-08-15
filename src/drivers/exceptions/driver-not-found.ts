import { NotFoundException } from '@nestjs/common/exceptions';

export class DriverNotFoundException extends NotFoundException {
  constructor() {
    super('Driver not found', 'Not found');
  }
}
