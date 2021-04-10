import axios from 'axios'
import test from 'japa'

test.group('api - status', () => {
  test('Get v1 status', async (assert) => {
    const result = await axios.get('http://127.0.0.1/v1')
    assert.equal(result.status, 200)
  })

  test('404 error testing', async (assert) => {
    const result = await axios.get('http://127.0.0.1/v1324')
    assert.equal(result.status, 404)
  })
})
