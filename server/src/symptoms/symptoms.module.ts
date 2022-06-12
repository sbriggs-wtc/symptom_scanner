import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SymptomsController } from './symptoms.controller';
import { SymptomsService } from './symptoms.service';

@Module({
  imports: [HttpModule],
  controllers: [SymptomsController],
  providers: [SymptomsService],
})
export class SymptomsModule {}
