import { NotFoundException } from '@nestjs/common/exceptions';

export class PersonNotFoundException extends NotFoundException {
  constructor() {
    super('Person not found', 'Not found');
  }
}
