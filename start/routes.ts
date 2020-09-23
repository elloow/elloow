/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { APIs: { v1: { route: '/v1', state: 'active' } } }
})

Route.group(() => {
  Route.get('/', async () => {
    return { success: true, active: true }
  })
}).prefix('v1')

Route.any('*', async ({ response }: HttpContextContract) => {
  return response
    .status(404)
    .send(
      'Page not found'
    )
})
