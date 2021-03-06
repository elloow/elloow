import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'
import Answer from 'App/Helpers/Answer'

Route.get('/', async () => {
  return { APIs: { v1: { route: '/v1', state: 'active' } } }
})

import './v1'

Route.any('*', async ({ response }: HttpContextContract) => {
  return response
    .status(404)
    .send(
      Answer.fail('Resource not found', 'RESOURCE_NOT_FOUND')
    )
})
