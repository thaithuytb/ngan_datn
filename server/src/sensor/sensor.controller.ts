import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateSensorDto, GetSensorDto } from './dtos/createSensorDto';
import { SensorService } from './sensor.service';
import { RoleAdminGuard } from '../guards/roleAdminGuard';

@Controller('api/v1/sensor')
export class SensorController {
  constructor(private sensorService: SensorService) {}

  @Get('/')
  async getSensors(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('idSensor') idSensor: string,
    @Query('description') description: string,
    @Query('value') value: string,
    @Query('lastUpdate') lastUpdate: string,
  ) {
    return await this.sensorService.getSensors({
      page,
      limit,
      idSensor,
      description,
      value,
      lastUpdate,
    } as GetSensorDto);
  }

  @Get('/all')
  async getAllSensors() {
    return await this.sensorService.getAllSensors();
  }

  @Post('/create')
  @UseGuards(RoleAdminGuard)
  async createSensors(@Body('createSensors') createSensors: CreateSensorDto[]) {
    return await this.sensorService.createSensors(createSensors);
  }

  @Post('/create/one')
  @UseGuards(RoleAdminGuard)
  async createSensor(@Body('createSensor') createSensor: CreateSensorDto) {
    return await this.sensorService.createSensor(createSensor);
  }
}
