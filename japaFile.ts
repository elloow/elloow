import 'reflect-metadata'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'
import execa from 'execa'
import HttpClient from './tests/HttpClient'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function startHttpServer () {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

async function runMigrations () {
  console.info('Run migrations')
  await execa.node('ace', ['migration:run'], { stdio: 'inherit' })
}

async function rollbackMigrations () {
  console.info('Rollback migrations')
  await execa.node('ace', ['migration:rollback'], { stdio: 'inherit' })
}

async function initHttpClient () {
  HttpClient.setConfig({
    validateStatus: () => {
      return true
    },
    baseURL: `http://127.0.0.1:${process.env.PORT}/`,
    withCredentials: true
  })
}

function getTestFiles () {
  const userDefined = process.argv.slice(2)[0]
  if (!userDefined) {
    return 'tests/**/*.spec.ts'
  }

  return `${userDefined.replace(/\.ts$|\.js$/, '')}.ts`
}

/**
 * Configure test runner
 */
configure({
  files: [getTestFiles()],
  before: [runMigrations, startHttpServer, initHttpClient],
  after: [rollbackMigrations],
  timeout: 20000
})
