import { Injectable } from '@nestjs/common';
import resolveError from '../responses/resolveError';
import { responseSuccess } from '../responses/success';
import { CreateSensorDto, GetSensorDto } from './dtos/createSensorDto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  async createSensors(inputSensors: CreateSensorDto[]) {
    try {
      return await this.prisma.sensor.createMany({
        data: inputSensors,
      });
    } catch (error) {
      resolveError(error);
    }
  }

  async createSensor(inputSensor: CreateSensorDto) {
    try {
      return await this.prisma.sensor.create({
        data: inputSensor,
      });
    } catch (error) {
      resolveError(error);
    }
  }

  async getAllSensors() {
    try {
      const sensors = await this.prisma.sensor.findMany({});
      return responseSuccess(sensors);
    } catch (error) {
      resolveError(error);
    }
  }

  async getSensors(getSensorsDto?: GetSensorDto) {
    const condition: Prisma.SensorWhereInput = {
      idSensor: {
        contains: getSensorsDto.idSensor || '',
      },
      description: {
        contains: getSensorsDto.description || '',
      },
      value: {
        gte:
          getSensorsDto.value == '0'
            ? 0
            : parseFloat(getSensorsDto.value) || -100000000,
      },
    };
    const limit = getSensorsDto?.limit ? getSensorsDto.limit : 10;
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        const total = await prisma.sensor.count({
          where: condition,
        });
        const sensors = await prisma.sensor.findMany({
          orderBy: {
            id: 'desc',
          },
          where: condition,
          skip: getSensorsDto?.page ? (+getSensorsDto.page - 1) * limit : 0,
          take: +limit,
        });
        return {
          sensors,
          totalPage: Math.ceil(total / limit),
        };
      });

      return responseSuccess(result);
    } catch (error) {
      resolveError(error);
    }
  }
}
