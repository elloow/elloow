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
})
