import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeGroup } from './entities/attribute-group.entity';
import { AttributeGroupQueryRepository } from './repositories/attribute-group-query.repository';
import { AttributeQueryRepository } from './repositories/attribute-query.repository';
import { SpecificationFactory } from '../common/specifications/specification.factory';
import { AttributeGroupService } from './services/attribute-group.service';
import { AttributeGroupController } from './controllers/attribute-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeGroup])],
  exports: [TypeOrmModule],
  controllers: [AttributeController, AttributeGroupController],
  providers: [
    AttributeService,
    AttributeGroupService,
    AttributeQueryRepository,
    AttributeGroupQueryRepository,
    SpecificationFactory,
  ],
})
export class AttributeModule {}
