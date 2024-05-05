import { AppService } from './app.service'
import { TestBed } from '@automock/jest'
import { CHILD_TOPICS, PARENT_TOPIC } from './constants'
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices'

describe('AppService', () => {
  let appService: AppService
  let mqttClient: jest.Mocked<ClientProxy>

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AppService).compile()

    appService = unit
    mqttClient = unitRef.get('MQTT_CLIENT')
  })

  describe('handleNotifications', () => {
    beforeEach(() => {
      mqttClient.emit = jest.fn()
    })

    it('should emit a message to the parent topic when the payload from any child topic is 0', async () => {
      await appService.handleNotifications('0', CHILD_TOPICS[0])

      expect(mqttClient.emit).toHaveBeenCalledWith(PARENT_TOPIC, new MqttRecordBuilder('0').setQoS(2).build())
    })

    it(`should emit a message to the parent topic when the payload is 1 and all other child topics' previous payload is 1`, async () => {
      appService['topicStatusMap'] = new Map(CHILD_TOPICS.map(topic => [topic, '1']))
      appService['topicStatusMap'].set(CHILD_TOPICS[0], '0')

      await appService.handleNotifications('1', CHILD_TOPICS[0])

      expect(mqttClient.emit).toHaveBeenCalledWith(PARENT_TOPIC, new MqttRecordBuilder('1').setQoS(2).build())
    })

    it(`should not emit a message to the parent topic when the payload is 1 and any other child topic's previous payload is 0`, async () => {
      appService['topicStatusMap'] = new Map(CHILD_TOPICS.map(topic => [topic, '1']))
      appService['topicStatusMap'].set(CHILD_TOPICS[0], '0')

      await appService.handleNotifications('1', CHILD_TOPICS[1])

      expect(mqttClient.emit).not.toHaveBeenCalled()
    })
  })
})
