import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { Permission } from './permission.entity';

@Entity()
export class UserRolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    width: 10,
    nullable: false,
  })
  userRoleId: number;

  @Column({
    type: 'integer',
    width: 10,
    nullable: false,
  })
  permissionId: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  isRead: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isCreate: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isUpdate: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isDelete: boolean;

  @ManyToOne(() => UserRole, (userRole) => userRole.userRolePermissions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'userRoleId' })
  userRole: UserRole;

  @ManyToOne(() => Permission, (permission) => permission.userRolePermissions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;
}
