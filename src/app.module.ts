import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConstructorsModule } from './constructors/constructors.module';
import { PeopleModule } from './people/people.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    ConstructorsModule,
    PeopleModule,
    DriversModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
