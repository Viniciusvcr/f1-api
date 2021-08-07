import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeopleService } from 'src/people/people.service';
import { IsNull, Repository } from 'typeorm';
import { CreateConstructorDto } from './dto/create-constructor.dto';
import { QueryConstructorDto } from './dto/query-constructor.dto';
import { UpdateConstructorDto } from './dto/update-constructor.dto';
import { Constructor } from './entities/constructor.entity';
import { ConstructorNotFoundException } from './exceptions/not-found.exception';

@Injectable()
export class ConstructorsService {
  constructor(
    @InjectRepository(Constructor)
    private readonly constructorRepository: Repository<Constructor>,
    private readonly peopleService: PeopleService,
  ) {}

  create(createConstructorDto: CreateConstructorDto) {
    return this.constructorRepository.save(createConstructorDto);
  }

  findAll(query?: QueryConstructorDto) {
    return this.constructorRepository.find(query);
  }

  async findOne(id: number) {
    return this.constructorRepository.findOneOrFail(id, {
      relations: ['teamMembers'],
    });
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

  findTeamMembers(id: number) {
    return this.peopleService.findAll({ where: { id } });
  }

  async findTeamMember(id: number, personId: number) {
    return this.peopleService.findOneTeamMember(id, personId);
  }
}
