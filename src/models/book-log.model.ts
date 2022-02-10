import {Entity, model, property} from '@loopback/repository';

@model()
export class BookLog extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  userId?: number;

  @property({
    type: 'number',
  })
  bookId?: number;

  constructor(data?: Partial<BookLog>) {
    super(data);
  }
}

export interface BookLogRelations {
  // describe navigational properties here
}

export type BookLogWithRelations = BookLog & BookLogRelations;
