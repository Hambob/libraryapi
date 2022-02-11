import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Category} from './category.model';
import {User} from './user.model';
import {BookLog} from './book-log.model';

@model()
export class Book extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'boolean',
    required: true,
  })
  avaliable: boolean;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @belongsTo(() => Category)
  categoryId: number;

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => User, {through: {model: () => BookLog}})
  usersThr: User[];

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
