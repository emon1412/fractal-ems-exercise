import { Inject, Injectable } from '@nestjs/common'
import { CHILD_TOPICS, PARENT_TOPIC } from './constants'
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices'

@Injectable()
export class AppService {
  topicStatusMap = new Map(CHILD_TOPICS.map(topic => [topic, '1']))
  constructor(@Inject('MQTT_CLIENT') private client: ClientProxy) {}

  public async handleNotification(payload: string, topic: string) {
    this.topicStatusMap.set(topic, payload)

    switch (payload) {
      case '0':
        console.log('Sending 0 to parent topic')
        const record = new MqttRecordBuilder('0').setQoS(2).build()
        await this.client.emit(PARENT_TOPIC, record)
        break
      case '1':
        if (this.shouldUpdateParentTopic()) {
          console.log('Sending 1 to parent topic')
          const record = new MqttRecordBuilder('1').setQoS(2).build()
          await this.client.emit(PARENT_TOPIC, record)
        }
        break
      default:
        console.log(`Received unknown value ${payload} from ${topic}`)
    }
  }

  private shouldUpdateParentTopic() {
    for (const [_, value] of this.topicStatusMap) {
      if (value === '0') {
        return false
      }
    }

    return true
  }
}
