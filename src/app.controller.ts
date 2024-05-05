import { Controller } from '@nestjs/common'
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('site/123/photovoltaic/skidControlUnits/01A/inverters/+/status')
  async getNotifications(@Payload() payload: string | number, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`)
    // stringify payload to make sure it works with 0 and '0'
    await this.appService.handleNotification(String(payload), context.getTopic())
  }

  // @MessagePattern('site/123/photovoltaic/skidControlUnits/01A/status')
  // async getNotifications2(
  //   @Payload() payload: string,
  // ) {
  //   console.log(`RECEIVED PARENT TOPIC. payload: ${payload}`);
  // }
}
