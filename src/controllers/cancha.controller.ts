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
import {Cancha} from '../models';
import {CanchaRepository} from '../repositories';

export class CanchaController {
  constructor(
    @repository(CanchaRepository)
    public canchaRepository : CanchaRepository,
  ) {}

  @post('/canchas')
  @response(200, {
    description: 'Cancha model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cancha)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cancha, {
            title: 'NewCancha',
            exclude: ['id'],
          }),
        },
      },
    })
    cancha: Omit<Cancha, 'id'>,
  ): Promise<Cancha> {
    return this.canchaRepository.create(cancha);
  }

  @get('/canchas/count')
  @response(200, {
    description: 'Cancha model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cancha) where?: Where<Cancha>,
  ): Promise<Count> {
    return this.canchaRepository.count(where);
  }

  @get('/canchas')
  @response(200, {
    description: 'Array of Cancha model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cancha, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cancha) filter?: Filter<Cancha>,
  ): Promise<Cancha[]> {
    return this.canchaRepository.find(filter);
  }

  @patch('/canchas')
  @response(200, {
    description: 'Cancha PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cancha, {partial: true}),
        },
      },
    })
    cancha: Cancha,
    @param.where(Cancha) where?: Where<Cancha>,
  ): Promise<Count> {
    return this.canchaRepository.updateAll(cancha, where);
  }

  @get('/canchas/{id}')
  @response(200, {
    description: 'Cancha model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cancha, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cancha, {exclude: 'where'}) filter?: FilterExcludingWhere<Cancha>
  ): Promise<Cancha> {
    return this.canchaRepository.findById(id, filter);
  }

  @patch('/canchas/{id}')
  @response(204, {
    description: 'Cancha PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cancha, {partial: true}),
        },
      },
    })
    cancha: Cancha,
  ): Promise<void> {
    await this.canchaRepository.updateById(id, cancha);
  }

  @put('/canchas/{id}')
  @response(204, {
    description: 'Cancha PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cancha: Cancha,
  ): Promise<void> {
    await this.canchaRepository.replaceById(id, cancha);
  }

  @del('/canchas/{id}')
  @response(204, {
    description: 'Cancha DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.canchaRepository.deleteById(id);
  }
}
