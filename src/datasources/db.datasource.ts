import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'mysql',
  url: 'mysql://u9gpfpwuw10u7mlt:JJt7zey5gxXXWGSN2HbH@bpzy7qqzxnyicvykextz-mysql.services.clever-cloud.com:3306/bpzy7qqzxnyicvykextz',
  host: 'bpzy7qqzxnyicvykextz-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'u9gpfpwuw10u7mlt',
  password: 'JJt7zey5gxXXWGSN2HbH',
  database: 'bpzy7qqzxnyicvykextz'
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
