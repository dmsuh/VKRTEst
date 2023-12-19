import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

export enum EUploadType {
  folder = 'folder',
  file = 'file',
}

@Entity()
@Tree('closure-table')
export class Upload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  parentId: number | null = null;

  @Column({
    type: 'enum',
    enum: EUploadType,
  })
  uploadType: EUploadType;

  // "My File Name.jpg" or "New folder"
  @Column({
    type: 'varchar',
    length: 64,
  })
  name: string;

  // image/jpeg etc
  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  mimeType: string;

  // {uuid}.{ext}
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  filename: string;

  @Column({
    type: 'bigint',
    default: 0,
  })
  size = 0;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @TreeParent()
  parent: Upload;

  @TreeChildren()
  children: Upload[];
}
