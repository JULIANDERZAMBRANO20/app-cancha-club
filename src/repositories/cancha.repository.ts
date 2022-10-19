import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cancha, CanchaRelations, Profesor} from '../models';
import {ProfesorRepository} from './profesor.repository';

export class CanchaRepository extends DefaultCrudRepository<
  Cancha,
  typeof Cancha.prototype.id,
  CanchaRelations
> {

  public readonly profesor: HasOneRepositoryFactory<Profesor, typeof Cancha.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('ProfesorRepository') protected profesorRepositoryGetter: Getter<ProfesorRepository>,
  ) {
    super(Cancha, dataSource);
    this.profesor = this.createHasOneRepositoryFactoryFor('profesor', profesorRepositoryGetter);
    this.registerInclusionResolver('profesor', this.profesor.inclusionResolver);
  }
}
