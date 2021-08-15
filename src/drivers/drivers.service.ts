import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonRole } from 'src/people/entities/role.enum';
import { FindOneOptions, Repository } from 'typeorm';
import { AddWinDto } from './dto/add-win.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { RaceResultDto } from './dto/race-result.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { DriverNotFoundException } from './exceptions/driver-not-found';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto) {
    return this.driversRepository.save(createDriverDto);
  }

  async findAll(options?: FindOneOptions<Driver>) {
    return this.driversRepository.find(options);
  }

  async findOne(id: number) {
    return this.driversRepository.findOneOrFail(id, {
      relations: ['currentTeam'],
    });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    if (!(await this.driversRepository.findOne(id))) {
      throw new DriverNotFoundException();
    }

    return this.driversRepository.update(id, updateDriverDto);
  }

  async remove(id: number) {
    if (!(await this.driversRepository.findOne(id))) {
      throw new DriverNotFoundException();
    }

    return this.driversRepository.delete(id);
  }

  async addWin(id: number, addWinDto: AddWinDto) {
    const driver = await this.driversRepository.findOneOrFail(id);

    if (this.isRetired(driver)) {
      throw new UnprocessableEntityException(
        'Cannot add a win to a retired driver',
      );
    }

    const { fastestLap, grandPrixName, firstVictory, pointsAwarded } =
      addWinDto;

    driver.grandPrixEntries++;
    driver.wins++;
    driver.podiums++;
    driver.careerPoints += pointsAwarded;
    driver.lastVictory = grandPrixName;
    driver.lastGrandPrix = grandPrixName;

    if (fastestLap) {
      driver.fastestLaps++;
    }

    if (firstVictory) {
      driver.firstVictory = grandPrixName;
    }

    return this.driversRepository.save(driver);
  }

  async addFastestLap(id: number) {
    const driver = await this.driversRepository.findOneOrFail(id);

    if (this.isRetired(driver)) {
      throw new UnprocessableEntityException(
        'Cannot add a fastest lap to a retired driver',
      );
    }

    driver.fastestLaps++;

    return this.driversRepository.save(driver);
  }

  async updateWithRaceResult(id: number, raceResultDto: RaceResultDto) {
    const driver = await this.driversRepository.findOneOrFail(id);

    if (this.isRetired(driver)) {
      throw new UnprocessableEntityException(
        'Cannot add a fastest lap to a retired driver',
      );
    }

    const { grandPrixName, fastestLap, points, position } = raceResultDto;

    if (this.isRaceWin(position)) {
      return this.addWin(id, {
        fastestLap,
        grandPrixName,
        firstVictory: this.isFirstVictory(driver),
        pointsAwarded: points,
      });
    }

    driver.grandPrixEntries++;
    driver.careerPoints += points;
    driver.lastGrandPrix = grandPrixName;

    if (this.isFirstGrandPrix(driver)) {
      driver.firstGrandPrix = grandPrixName;
    }

    if (this.isPodiumFinish(position)) {
      driver.podiums++;
    }

    if (fastestLap) {
      driver.fastestLaps++;
    }

    return this.driversRepository.save(driver);
  }

  private isRetired(driver: Driver) {
    return driver.role === PersonRole.RETIRED_DRIVER;
  }

  private isFirstVictory(driver: Driver) {
    return !!driver.firstVictory;
  }

  private isFirstGrandPrix(driver: Driver) {
    return !!driver.firstGrandPrix;
  }

  private isPodiumFinish(position: number) {
    return position <= parseInt(process.env.PODIUM_MIN_POSITION);
  }

  private isRaceWin(position: number) {
    return position === 1;
  }
}
