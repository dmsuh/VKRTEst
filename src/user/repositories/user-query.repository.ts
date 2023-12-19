import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { QueryFilterUserDto } from '../dto/query-filter-user.dto';
import { SpecificationFactory } from '../../common/specifications/specification.factory';

@Injectable()
export class UserQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly specificationFactory: SpecificationFactory<User>,
  ) {}

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  getBaseQuery(dto: QueryFilterUserDto) {
    const query = this.userRepository.createQueryBuilder();

    this.specificationFactory.build(dto, query, [
      { column: 'id', operator: 'equals' },
      { column: 'username', operator: 'like' },
      { column: 'email', operator: 'like' },
      { column: 'firstName', operator: 'like' },
      { column: 'lastName', operator: 'like' },
      { column: 'code', operator: 'like' },
      { column: 'ip', operator: 'like' },
      { column: 'isActive', operator: 'equals' },
      { column: 'createdAt', operator: 'equals', type: 'date' },
    ]);

    return query;
  }
}
