import {Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {Book} from './book.model';
import {BookLog} from './book-log.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  role: string;

  @property({
    type: 'string',
  })
  fullname: string;

  // @property({
  //   type: 'array',
  //   itemType: 'string',
  // })
  // roles?: string[];

  @property({
    type: 'string',
    required: true,
    mongodb: {
      dataLength: 100,
    },
    index: {
      unique: true,
    },
    jsonSchema: {
      format: 'email',
      minLength: 5,
      maxLength: 50,
      transform: ['toLowerCase'],
    },
  })
  email: string;

  @hasMany(() => Book, {through: {model: () => BookLog}})
  booksThr: Book[];
  // @property({
  //   type: 'number',
  //   required: true,
  //   index: {
  //     unique: true,
  //   },
  //   jsonSchema: {
  //     maxLength: 10,
  //     minLength: 10,
  //   },
  // })
  // phone: number;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
  })
  verificationToken?: string;

  customerId: string;
  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
