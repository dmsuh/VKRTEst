import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRole } from './entities/user-role.entity';
import { UserRolePermission } from './entities/user-role-permission.entity';
import { Permission } from './entities/permission.entity';
import { UserToken } from './entities/user-token.entity';
import { UserQueryRepository } from './repositories/user-query.repository';
import { SpecificationFactory } from '../common/specifications/specification.factory';
import { UserRoleService } from './services/user-role.service';
import { UserRoleQueryRepository } from './repositories/user-role-query.repository';
import { UserRoleController } from './controllers/user-role.controller';
import { PermissionQueryRepository } from './repositories/permission-query.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRole,
      UserRolePermission,
      Permission,
      UserToken,
    ]),
  ],
  exports: [TypeOrmModule, UserService, UserQueryRepository],
  controllers: [UserController, UserRoleController],
  providers: [
    UserService,
    UserRoleService,
    UserQueryRepository,
    UserRoleQueryRepository,
    PermissionQueryRepository,
    SpecificationFactory,
  ],
})
export class UserModule {}
