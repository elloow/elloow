import UserRole from 'App/Models/UserRole'
import test from 'japa'
import HttpClient from '../../../HttpClient'

const httpClient = HttpClient.use()
const USER_BASIC = { email: 'test@test.com', password: '123' }

test.group('api/v1/auth - user', (group) => {
  group.beforeEach(async () => {
    const basicRole = await UserRole.findByOrFail('name', 'basic')

    await basicRole.related('users').create(USER_BASIC)
  })

  test('Login', async (assert) => {
    const result = await httpClient.post('/v1/auth/user', { email: USER_BASIC.email, password: USER_BASIC.password })
    assert.equal(result.status, 200)
    assert.isObject(result.data.data.user)
  })
})
