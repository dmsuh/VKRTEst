import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  userAgent: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  accessToken: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  passwordHash: string;

  @ManyToOne(() => User, (user) => user.userTokens, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}
