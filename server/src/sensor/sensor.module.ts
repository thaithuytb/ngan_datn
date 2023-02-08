import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SensorController } from './sensor.controller';

@Module({
  imports: [PrismaModule],
  providers: [SensorService],
  controllers: [SensorController],
})
export class SensorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(verifyTokenMiddleware).forRoutes('api/v1/sensor');
  }
}
