import { Controller, Get, Post, Body } from '@nestjs/common';
import { InputTextDto } from './dto/InputText.dto';
import { SymptomsService } from './symptoms.service';

@Controller('symptoms')
export class SymptomsController {
  constructor(private readonly symptomsService: SymptomsService) {}

  @Post()
  async getMatchingSymptoms(
    @Body() InputTextDto: InputTextDto,
  ): Promise<string> {
    const matches = await this.symptomsService.matchSymptoms(
      InputTextDto.inputText,
    );
    return JSON.stringify(matches);
  }
}
