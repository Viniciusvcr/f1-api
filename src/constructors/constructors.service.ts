import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';
import { Constructor } from './entities/constructor.entity';
import { ConstructorNotFoundException } from './exceptions/not-found.exception';

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

  async findOne(id: number) {
    const constructor = await this.constructorRepository.findOne(id);

    if (!constructor) {
      throw new ConstructorNotFoundException();
    }

    return constructor;
  }

  async update(id: number, updateConstructorDto: UpdateConstructorDto) {
    if (!(await this.constructorRepository.findOne(id))) {
      throw new ConstructorNotFoundException();
    }

    return this.constructorRepository.update(id, updateConstructorDto);
  }

  async remove(id: number) {
    if (!(await this.constructorRepository.findOne(id))) {
      throw new ConstructorNotFoundException();
    }

    this.constructorRepository.delete(id);
  }

  findActive() {
    return this.constructorRepository.find({
      where: { championshipLeavingYear: IsNull() },
    });
  }
}
