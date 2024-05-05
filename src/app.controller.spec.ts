import { TestBed } from '@automock/jest'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController
  let appService: jest.Mocked<AppService>

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AppController).compile()

    appController = unit
    appService = unitRef.get(AppService)
  })

  describe('async handleNotifications', () => {
    it('should call appService.handleNotifications with correct args', async () => {
      const topic = 'HOT'
      const payload = 'LALALA'
      const context = {
        getTopic: jest.fn().mockReturnValue(topic),
      }

      await appController.handleNotifications(payload, context as any)

      expect(appService.handleNotifications).toHaveBeenCalledWith(payload, topic)
    })
  })
})
