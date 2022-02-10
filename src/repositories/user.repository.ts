import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserCredentials, UserRelations, Book, BookLog} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {BookLogRepository} from './book-log.repository';
import {BookRepository} from './book.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  public readonly booksThr: HasManyThroughRepositoryFactory<Book, typeof Book.prototype.id,
          BookLog,
          typeof User.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('BookLogRepository') protected bookLogRepositoryGetter: Getter<BookLogRepository>, @repository.getter('BookRepository') protected bookRepositoryGetter: Getter<BookRepository>,
  ) {
    super(User, dataSource);
    this.booksThr = this.createHasManyThroughRepositoryFactoryFor('booksThr', bookRepositoryGetter, bookLogRepositoryGetter,);
    this.registerInclusionResolver('booksThr', this.booksThr.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }
  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
