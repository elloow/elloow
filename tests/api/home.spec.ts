import test from 'japa'
import HttpClient from '../HttpClient'

const httpClient = HttpClient.use()

test.group('api - status', () => {
  test('Get v1 status', async (assert) => {
    const result = await httpClient.get('/')
    assert.equal(result.status, 200)
    assert.isObject(result.data.APIs)
    assert.containsAllKeys(result.data.APIs, ['v1'])
  })

  test('404 error testing', async (assert) => {
    const result = await httpClient.get('/v1324')
    assert.equal(result.status, 404)
  })
})
