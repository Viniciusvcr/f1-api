import { NotFoundException } from '@nestjs/common/exceptions';

export class ConstructorNotFoundException extends NotFoundException {
  constructor() {
    super('Constructor not found', 'Not found');
  }
}
