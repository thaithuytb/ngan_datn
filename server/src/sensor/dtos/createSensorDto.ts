import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  @IsNotEmpty()
  idSensor: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  lastUpdate: string;
}

export interface GetSensorDto {
  page?: number;
  limit?: number;
  idSensor?: string;
  description?: string;
  value?: string;
  lastUpdate?: string;
}
