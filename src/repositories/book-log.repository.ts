import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {BookLog, BookLogRelations} from '../models';

export class BookLogRepository extends DefaultCrudRepository<
  BookLog,
  typeof BookLog.prototype.id,
  BookLogRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(BookLog, dataSource);
  }
}
