import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';
import { QueryFilterUserRoleDto } from '../dto/query-filter-user-role.dto';
import { SpecificationFactory } from '../../common/specifications/specification.factory';

@Injectable()
export class UserRoleQueryRepository {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly specificationFactory: SpecificationFactory<UserRole>,
  ) {}

  getBaseQuery(dto: QueryFilterUserRoleDto) {
    const query = this.userRoleRepository.createQueryBuilder();

    this.specificationFactory.build(dto, query, [
      { column: 'id', operator: 'equals' },
      { column: 'name', operator: 'like' },
    ]);

    return query;
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  findOne(id: number) {
    return this.userRoleRepository
      .createQueryBuilder('ur')
      .leftJoinAndSelect('ur.userRolePermissions', 'urp')
      .where('ur.id = :id', { id })
      .getOne();
  }
}
