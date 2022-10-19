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
  Cancha,
  Profesor,
} from '../models';
import {CanchaRepository} from '../repositories';

export class CanchaProfesorController {
  constructor(
    @repository(CanchaRepository) protected canchaRepository: CanchaRepository,
  ) { }

  @get('/canchas/{id}/profesor', {
    responses: {
      '200': {
        description: 'Cancha has one Profesor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Profesor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Profesor>,
  ): Promise<Profesor> {
    return this.canchaRepository.profesor(id).get(filter);
  }

  @post('/canchas/{id}/profesor', {
    responses: {
      '200': {
        description: 'Cancha model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cancha.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {
            title: 'NewProfesorInCancha',
            exclude: ['id'],
            optional: ['canchaId']
          }),
        },
      },
    }) profesor: Omit<Profesor, 'id'>,
  ): Promise<Profesor> {
    return this.canchaRepository.profesor(id).create(profesor);
  }

  @patch('/canchas/{id}/profesor', {
    responses: {
      '200': {
        description: 'Cancha.Profesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {partial: true}),
        },
      },
    })
    profesor: Partial<Profesor>,
    @param.query.object('where', getWhereSchemaFor(Profesor)) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.canchaRepository.profesor(id).patch(profesor, where);
  }

  @del('/canchas/{id}/profesor', {
    responses: {
      '200': {
        description: 'Cancha.Profesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Profesor)) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.canchaRepository.profesor(id).delete(where);
  }
}
