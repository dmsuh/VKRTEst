import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { Exclude } from 'class-transformer';
import { UserToken } from './user-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  userRoleId: number | null = null;

  @Column({
    unique: true,
    type: 'varchar',
    length: 20,
  })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'varchar',
    length: 255,
  })
  passwordHash?: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  lastName: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 96,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  ip: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @ManyToOne(() => UserRole, (userRole) => userRole.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  userRole: UserRole | null;

  @OneToMany(() => UserToken, (userToken) => userToken.user, {
    orphanedRowAction: 'delete',
    nullable: false,
  })
  userTokens: UserToken[];
}
