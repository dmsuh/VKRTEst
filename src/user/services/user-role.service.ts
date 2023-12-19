import { Injectable } from '@nestjs/common';
import { UserRoleQueryRepository } from '../repositories/user-role-query.repository';
import { UserRoleNotFoundException } from '../exceptions/user-role-not-found.exception';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { DataSource } from 'typeorm';
import { PermissionQueryRepository } from '../repositories/permission-query.repository';
import { UserRole } from '../entities/user-role.entity';
import { UserRolePermission } from '../entities/user-role-permission.entity';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { QueryFilterUserRoleDto } from '../dto/query-filter-user-role.dto';
import { InvalidUpdateParameterException } from '../../common/exceptions/invalid-update-parameter.exception';
import { EntityDeleteDto } from '../../common/dto/entity-delete.dto';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleQueryRepository: UserRoleQueryRepository,
    private readonly permissionQueryRepository: PermissionQueryRepository,
    private readonly dataSource: DataSource,
  ) {}

  findAll(dto: QueryFilterUserRoleDto) {
    return this.userRoleQueryRepository.getBaseQuery(dto).getMany();
  }

  async findOne(id: number) {
    const userRole = await this.userRoleQueryRepository.findOne(id);
    if (!userRole) {
      throw new UserRoleNotFoundException();
    }

    return userRole;
  }

  async paginate(dto: QueryFilterUserRoleDto) {
    const query = this.userRoleQueryRepository.getBaseQuery(dto);

    return {
      total: await query.getCount(),
      data: await query.getMany(),
    };
  }

  create(dto: CreateUserRoleDto) {
    return this.dataSource.transaction(async (manager) => {
      const permissions = await this.permissionQueryRepository.findAll();

      const userRole = new UserRole();
      userRole.name = dto.name;
      userRole.permission = null;

      userRole.userRolePermissions = [];
      permissions.forEach((permission) => {
        const userRolePermission = new UserRolePermission();

        userRolePermission.permission = permission;

        userRole.userRolePermissions.push(userRolePermission);
      });

      return manager.save(userRole);
    });
  }

  update(id: number, dto: UpdateUserRoleDto) {
    if (id !== dto.id) {
      throw new InvalidUpdateParameterException();
    }

    return this.dataSource.transaction(async (manager) => {
      const userRole = await this.findOne(id);

      userRole.name = dto.name;

      dto.userRolePermissions.forEach((userRolePermissionDto) => {
        const userRolePermission = userRole.userRolePermissions.find(
          (urp) => urp.id === userRolePermissionDto.id,
        );

        if (userRolePermission) {
          userRolePermission.isRead = userRolePermissionDto.isRead;
          userRolePermission.isCreate = userRolePermissionDto.isCreate;
          userRolePermission.isUpdate = userRolePermissionDto.isUpdate;
          userRolePermission.isDelete = userRolePermissionDto.isDelete;
        }
      });

      return manager.save(userRole);
    });
  }

  remove(dto: EntityDeleteDto) {
    return this.dataSource.transaction(async (manager) => {
      for (const id of dto.ids) {
        const entity = await this.userRoleQueryRepository.findOne(id);
        if (entity) {
          await manager.remove(entity);
        }
      }

      return true;
    });
  }
}
