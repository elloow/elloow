import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  NODE_ENV: (_key, value) => {
    if (!value) {
      return String('production')
    }
    return String(value)
  },
  CACHE_VIEWS: Env.schema.boolean(),
  FRONT_HOST: Env.schema.string({ format: 'url' }),
  ROOT_HOST: Env.schema.string.optional({ format: 'url' }),

  DB_CONNECTION: Env.schema.enum(['mysql', 'pg', 'oracle']),

  MYSQL_HOST: Env.schema.string.optional({ format: 'host' }),
  MYSQL_PORT: Env.schema.number.optional(),
  MYSQL_USER: Env.schema.string.optional(),
  MYSQL_PASSWORD: Env.schema.string.optional(),
  MYSQL_DB_NAME: Env.schema.string.optional(),

  PG_HOST: Env.schema.string.optional({ format: 'host' }),
  PG_PORT: Env.schema.number.optional(),
  PG_USER: Env.schema.string.optional(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string.optional(),

  ORACLE_HOST: Env.schema.string.optional({ format: 'host' }),
  ORACLE_PORT: Env.schema.number.optional(),
  ORACLE_USER: Env.schema.string.optional(),
  ORACLE_PASSWORD: Env.schema.string.optional(),
  ORACLE_DB_NAME: Env.schema.string.optional(),

  REDIS_CONNECTION: Env.schema.enum(['local']),
  REDIS_HOST: Env.schema.string({ format: 'host' }),
  REDIS_PORT: Env.schema.number(),
  REDIS_PASSWORD: Env.schema.string.optional(),

  SMTP_HOST: Env.schema.string({ format: 'host' }),
  SMTP_PORT: Env.schema.number(),
  SMTP_USERNAME: Env.schema.string(),
  SMTP_PASSWORD: Env.schema.string()
})
