import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('site/123/photovoltaic/skidControlUnits/01A/inverters/+/status')
  async handleNotifications(@Payload() payload: string | number, @Ctx() context: MqttContext) {
    // stringify payload to make sure it works with 0 and '0'
    await this.appService.handleNotifications(String(payload), context.getTopic())
  }
}
