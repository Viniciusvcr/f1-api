import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { PersonNotFoundException } from './exceptions/person-not-found';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    return this.peopleRepository.save(createPersonDto);
  }

  async findAll(options?: FindOneOptions<Person>) {
    return this.peopleRepository.find(options);
  }

  findOneTeamMember(constructorId: number, id: number) {
    return this.peopleRepository.findOneOrFail(id, {
      where: { team: constructorId },
    });
  }

  async findOne(id: number) {
    return this.peopleRepository.findOneOrFail(id, { relations: ['team'] });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    if (!(await this.peopleRepository.findOne(id))) {
      throw new PersonNotFoundException();
    }

    return this.peopleRepository.update(id, updatePersonDto);
  }

  async remove(id: number) {
    if (!(await this.peopleRepository.findOne(id))) {
      throw new PersonNotFoundException();
    }

    return this.peopleRepository.delete(id);
  }
}
