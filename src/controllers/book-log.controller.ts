import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {BookLog} from '../models';
import {BookLogRepository} from '../repositories';

export class BookLogController {
  constructor(
    @repository(BookLogRepository)
    public bookLogRepository : BookLogRepository,
  ) {}

  @post('/book-logs')
  @response(200, {
    description: 'BookLog model instance',
    content: {'application/json': {schema: getModelSchemaRef(BookLog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLog, {
            title: 'NewBookLog',
            exclude: ['id'],
          }),
        },
      },
    })
    bookLog: Omit<BookLog, 'id'>,
  ): Promise<BookLog> {
    return this.bookLogRepository.create(bookLog);
  }

  @get('/book-logs/count')
  @response(200, {
    description: 'BookLog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BookLog) where?: Where<BookLog>,
  ): Promise<Count> {
    return this.bookLogRepository.count(where);
  }

  @get('/book-logs')
  @response(200, {
    description: 'Array of BookLog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BookLog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BookLog) filter?: Filter<BookLog>,
  ): Promise<BookLog[]> {
    return this.bookLogRepository.find(filter);
  }

  @patch('/book-logs')
  @response(200, {
    description: 'BookLog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLog, {partial: true}),
        },
      },
    })
    bookLog: BookLog,
    @param.where(BookLog) where?: Where<BookLog>,
  ): Promise<Count> {
    return this.bookLogRepository.updateAll(bookLog, where);
  }

  @get('/book-logs/{id}')
  @response(200, {
    description: 'BookLog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookLog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BookLog, {exclude: 'where'}) filter?: FilterExcludingWhere<BookLog>
  ): Promise<BookLog> {
    return this.bookLogRepository.findById(id, filter);
  }

  @patch('/book-logs/{id}')
  @response(204, {
    description: 'BookLog PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookLog, {partial: true}),
        },
      },
    })
    bookLog: BookLog,
  ): Promise<void> {
    await this.bookLogRepository.updateById(id, bookLog);
  }

  @put('/book-logs/{id}')
  @response(204, {
    description: 'BookLog PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bookLog: BookLog,
  ): Promise<void> {
    await this.bookLogRepository.replaceById(id, bookLog);
  }

  @del('/book-logs/{id}')
  @response(204, {
    description: 'BookLog DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bookLogRepository.deleteById(id);
  }
}
