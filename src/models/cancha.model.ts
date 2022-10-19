import {Entity, model, property, hasOne} from '@loopback/repository';
import {Profesor} from './profesor.model';

@model({settings: {strict: false}})
export class Cancha extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  localidad: string;

  @hasOne(() => Profesor)
  profesor: Profesor;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cancha>) {
    super(data);
  }
}

export interface CanchaRelations {
  // describe navigational properties here
}

export type CanchaWithRelations = Cancha & CanchaRelations;
