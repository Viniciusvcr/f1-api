import { Module } from '@nestjs/common';
import { ConstructorsService } from './constructors.service';
import { ConstructorsController } from './constructors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constructor } from './entities/constructor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Constructor])],
  controllers: [ConstructorsController],
  providers: [ConstructorsService],
})
export class ConstructorsModule {}
