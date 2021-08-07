import { Module } from '@nestjs/common';
import { ConstructorsService } from './constructors.service';
import { ConstructorsController } from './constructors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constructor } from './entities/constructor.entity';
import { PeopleModule } from 'src/people/people.module';

@Module({
  imports: [TypeOrmModule.forFeature([Constructor]), PeopleModule],
  controllers: [ConstructorsController],
  providers: [ConstructorsService],
})
export class ConstructorsModule {}
