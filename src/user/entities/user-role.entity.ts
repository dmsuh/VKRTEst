import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { UserRolePermission } from './user-role-permission.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 64,
    unique: true,
  })
  name: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  permission: object;

  @OneToMany(() => User, (user) => user.userRole)
  users: User[];

  @OneToMany(
    () => UserRolePermission,
    (userRolePermission) => userRolePermission.userRole,
    { cascade: true, orphanedRowAction: 'delete' },
  )
  userRolePermissions: UserRolePermission[];
}
