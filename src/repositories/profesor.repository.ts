import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Profesor, ProfesorRelations} from '../models';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.id,
  ProfesorRelations
> {
  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource,
  ) {
    super(Profesor, dataSource);
  }
}
