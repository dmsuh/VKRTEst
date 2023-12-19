import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRolePermission } from './user-role-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  key: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @OneToMany(
    () => UserRolePermission,
    (userRolePermission) => userRolePermission.permission,
  )
  userRolePermissions: UserRolePermission[];
}
