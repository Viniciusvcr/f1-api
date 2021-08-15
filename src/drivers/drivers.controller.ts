import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseIdPipe } from 'src/pipes/parse-id.pipe';
import { FindOneOptions } from 'typeorm';
import { DriversService } from './drivers.service';
import { AddWinDto } from './dto/add-win.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  findAll(@Query() options?: FindOneOptions<Driver>) {
    return this.driversService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.driversService.remove(id);
  }

  @Post(':id/add-race-win')
  addWin(@Param('id', ParseIdPipe) id: number, @Body() addWinDto: AddWinDto) {
    return this.driversService.addWin(id, addWinDto);
  }

  @Post(':id/add-fastest-lap')
  addFastestLap(@Param('id', ParseIdPipe) id: number) {
    return this.driversService.addFastestLap(id);
  }
}
