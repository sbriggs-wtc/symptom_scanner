import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SymptomsController } from './symptoms/symptoms.controller';
import { SymptomsService } from './symptoms/symptoms.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, SymptomsController],
  providers: [AppService, SymptomsService],
})
export class AppModule {}
