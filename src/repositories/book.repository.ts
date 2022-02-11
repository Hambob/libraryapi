import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Book, BookRelations, Category, User, BookLog} from '../models';
import {CategoryRepository} from './category.repository';
import {UserRepository} from './user.repository';
import {BookLogRepository} from './book-log.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id,
  BookRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof Book.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Book.prototype.id>;

  public readonly usersThr: HasManyThroughRepositoryFactory<User, typeof User.prototype.id,
          BookLog,
          typeof Book.prototype.id
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('BookLogRepository') protected bookLogRepositoryGetter: Getter<BookLogRepository>,
  ) {
    super(Book, dataSource);
    this.usersThr = this.createHasManyThroughRepositoryFactoryFor('usersThr', userRepositoryGetter, bookLogRepositoryGetter,);
    this.registerInclusionResolver('usersThr', this.usersThr.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
