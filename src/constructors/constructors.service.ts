import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';
import { Constructor } from './entities/constructor.entity';

@Injectable()
export class ConstructorsService {
  constructor(
    @InjectRepository(Constructor)
    private readonly constructorRepository: Repository<Constructor>,
  ) {}

  create(createConstructorDto: CreateConstructorDto) {
    return this.constructorRepository.save(createConstructorDto);
  }

  findAll() {
    return this.constructorRepository.find();
  }

  findOne(id: number) {
    return this.constructorRepository.findOne(id);
  }

  update(id: number, updateConstructorDto: UpdateConstructorDto) {
    return this.constructorRepository.update(id, updateConstructorDto);
  }

  remove(id: number) {
    return this.constructorRepository.delete(id);
  }
}
