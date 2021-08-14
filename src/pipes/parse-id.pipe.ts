import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    if (isNaN(value)) {
      throw new BadRequestException("'id' must be an integer");
    }

    return parseInt(value);
  }
}
