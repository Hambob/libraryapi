import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
User,
BookLog,
Book,
} from '../models';
import {UserRepository} from '../repositories';

export class UserBookController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/books', {
    responses: {
      '200': {
        description: 'Array of User has many Book through BookLog',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Book)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Book>,
  ): Promise<Book[]> {
    return this.userRepository.booksThr(id).find(filter);
  }

  @post('/users/{id}/books', {
    responses: {
      '200': {
        description: 'create a Book model instance',
        content: {'application/json': {schema: getModelSchemaRef(Book)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBookInUser',
            exclude: ['id'],
          }),
        },
      },
    }) book: Omit<Book, 'id'>,
  ): Promise<Book> {
    return this.userRepository.booksThr(id).create(book);
  }

  @patch('/users/{id}/books', {
    responses: {
      '200': {
        description: 'User.Book PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Partial<Book>,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.userRepository.booksThr(id).patch(book, where);
  }

  @del('/users/{id}/books', {
    responses: {
      '200': {
        description: 'User.Book DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Book)) where?: Where<Book>,
  ): Promise<Count> {
    return this.userRepository.booksThr(id).delete(where);
  }
}
