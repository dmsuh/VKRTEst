import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from './attribute.entity';

@Entity()
export class AttributeGroup {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Attribute, (attribute) => attribute.attributeGroup, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  attributes: Attribute[];
}
