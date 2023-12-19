import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttributeGroup } from './attribute-group.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  attributeGroupId: number;

  @Column({
    type: 'integer',
    nullable: false,
    default: 0,
  })
  sortOrder: number;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  name: string;

  @ManyToOne(
    () => AttributeGroup,
    (attributeGroup) => attributeGroup.attributes,
    {
      onDelete: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'attributeGroupId' })
  attributeGroup: AttributeGroup;
}
