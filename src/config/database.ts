import { TypeOrmModule } from '@nestjs/typeorm';

// TODO : Fix configuration with values from env variables

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dev',
  password: '123456*',
  database: 'symf_test',
  entities: ['dist/**/entities/*{.ts,.js}'],
  synchronize: true,
});
