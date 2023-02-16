import { Controller, Get } from '@nestjs/common';
import { PowerService } from './power.service';

@Controller('/power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}
  @Get('/')
  getAllPowers() {
    return this.powerService.getAllPowers();
  }
}
