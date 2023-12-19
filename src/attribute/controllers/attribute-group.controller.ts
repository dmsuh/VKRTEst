import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AttributeGroupService } from '../services/attribute-group.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAttributeGroupDto } from '../dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/update-attribute-group.dto';
import { EntityDeleteDto } from '../../common/dto/entity-delete.dto';
import { QueryFilterAttributeGroupDto } from '../dto/query-filter-attribute-group.dto';

@ApiTags('attribute')
@Controller('attribute-group')
export class AttributeGroupController {
  constructor(private readonly attributeGroupService: AttributeGroupService) {}

  @ApiOperation({
    summary: 'Получить весь список атрибутов',
  })
  @Get()
  findAll(@Query() dto: QueryFilterAttributeGroupDto) {
    return this.attributeGroupService.findAll(dto);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id гурппы',
    required: true,
  })
  @ApiOperation({
    summary: 'Получить группу атрибутов с вложенным списком фильтров',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attributeGroupService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Получить табличный список групп атрибутов',
  })
  @Post('paginate')
  paginate(@Body() dto: QueryFilterAttributeGroupDto) {
    return this.attributeGroupService.paginate(dto);
  }

  @ApiOperation({
    summary: 'Создать группу атрибутов с вложенным списком атрибутов',
  })
  @Post()
  create(@Body() dto: CreateAttributeGroupDto) {
    return this.attributeGroupService.create(dto);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id гурппы',
    required: true,
  })
  @ApiOperation({
    summary: 'Обновить группу атрибутов с вложенным списком атрибутов',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAttributeGroupDto) {
    return this.attributeGroupService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Множественное удаление групп и подчинённых атрибутов',
  })
  @Delete()
  remove(@Body() dto: EntityDeleteDto) {
    return this.attributeGroupService.remove(dto);
  }
}
