import test from 'japa'
import HttpClient from '../../HttpClient'

const httpClient = HttpClient.use()

test.group('api/v1 - status', () => {
  test('Get v1 status', async (assert) => {
    const result = await httpClient.get('/v1')
    assert.equal(result.status, 200)
    assert.isTrue(result.data.success)
    assert.isTrue(result.data.active)
  })
})
