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
import { ConstructorsService } from './constructors.service';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { QueryConstructorDto } from './dto/query-constructor.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';

@Controller('constructors')
export class ConstructorsController {
  constructor(private readonly constructorsService: ConstructorsService) {}

  @Post()
  create(@Body() createConstructorDto: CreateConstructorDto) {
    return this.constructorsService.create(createConstructorDto);
  }

  @Get()
  findAll(@Query() query: QueryConstructorDto) {
    return this.constructorsService.findAll(query);
  }

  @Get('active')
  findActive() {
    return this.constructorsService.findActive();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.constructorsService.findOne(id);
  }

  @Get(':id/teamMembers')
  findTeamMembers(@Param('id', ParseIdPipe) id: number) {
    return this.constructorsService.findTeamMembers(id);
  }

  @Get(':id/teamMembers/:personId')
  findTeamMember(
    @Param('id', ParseIdPipe) id: number,
    @Param('personId', ParseIdPipe) personId: number,
  ) {
    return this.constructorsService.findTeamMember(id, personId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateConstructorDto: UpdateConstructorDto,
  ) {
    return this.constructorsService.update(id, updateConstructorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.constructorsService.remove(id);
  }
}
