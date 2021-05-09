import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'
import Answer from 'App/Helpers/Answer'
import fs from 'fs'
import path from 'path'

import './v1'

Route.get('/', async () => {
  return { APIs: { v1: { route: '/v1', state: 'active', docs: '/docs' } } }
})

Route.get('/docs', async ({ response }: HttpContextContract) => {
  const insomniaDocsFileContent = fs.readFileSync(`${path.dirname(__dirname)}/../insomnia_documentation.json`, 'utf-8')
  return response.type('json').send(insomniaDocsFileContent)
})

Route.any('*', async ({ response }: HttpContextContract) => {
  return response
    .status(404)
    .send(
      Answer.fail('Resource not found', 'RESOURCE_NOT_FOUND')
    )
})
