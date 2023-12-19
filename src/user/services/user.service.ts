import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { UserQueryRepository } from '../repositories/user-query.repository';
import { QueryFilterUserDto } from '../dto/query-filter-user.dto';
import { UserRoleService } from './user-role.service';
import { InvalidUpdateParameterException } from '../../common/exceptions/invalid-update-parameter.exception';
import { EntityDeleteDto } from '../../common/dto/entity-delete.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly userRoleService: UserRoleService,
    private readonly dataSource: DataSource,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  findAll(dto: QueryFilterUserDto) {
    return this.userQueryRepository.getBaseQuery(dto).getMany();
  }

  async findOne(id: any) {
    console.log(id);
    const user = await this.userQueryRepository.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async paginate(dto: QueryFilterUserDto) {
    const query = this.userQueryRepository.getBaseQuery(dto);

    return {
      total: await query.getCount(),
      data: await query.getMany(),
    };
  }

  create(dto: CreateUserDto) {
    return this.dataSource.transaction(async (manager) => {
      const userRole = dto.userRoleId
        ? await this.userRoleService.findOne(dto.userRoleId)
        : null;

      const user = new User();

      user.userRoleId = userRole.id;
      user.username = dto.username;
      user.email = dto.email;
      user.passwordHash = await bcrypt.hash(dto.password, 10);
      user.firstName = dto.firstName;
      user.lastName = dto.lastName;
      user.isActive = dto.isActive;

      return manager.save(user);
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    if (id !== dto.id) {
      throw new InvalidUpdateParameterException();
    }

    return this.dataSource.transaction(async (manager) => {
      const user = await this.findOne(id);

      const userRole =
        dto.userRoleId !== null
          ? await this.userRoleService.findOne(dto.userRoleId)
          : null;

      user.userRoleId = userRole?.id || null;
      user.username = dto.username;
      user.email = dto.email;

      if (dto.password) {
        user.passwordHash = await bcrypt.hash(dto.password, 10);
      }

      user.firstName = dto.firstName;
      user.lastName = dto.lastName;
      user.isActive = dto.isActive;

      return manager.save(user);
    });
  }

  remove(dto: EntityDeleteDto) {
    return this.dataSource.transaction(async (manager) => {
      for (const id of dto.ids) {
        const entity = await this.userQueryRepository.findOne(id);
        if (entity) {
          await manager.remove(entity);
        }
      }

      return true;
    });
  }
}
