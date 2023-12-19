import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QueryFilterAttributeDto } from '../dto/query-filter-attribute.dto';

@ApiBearerAuth('basic')
@ApiHeader({
  name: 'Authorization',
  description: 'Токен пользователя для авторизации запросов',
  required: false,
})
@ApiTags('attribute')
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @ApiOperation({
    summary: 'Получить весь список атрибутов',
  })
  @Get()
  findAll(@Query() dto: QueryFilterAttributeDto) {
    return this.attributeService.findAll(dto);
  }

  @ApiOperation({
    summary: 'Получить группированный список атрибутов',
  })
  @Get('grouped')
  findGrouped() {
    return this.attributeService.findGrouped();
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id атрибута',
    required: true,
  })
  @ApiOperation({
    summary: 'Получить атрибут по id',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.attributeService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Получить табличный список атрибутов',
  })
  @Post('paginate')
  paginate(@Body() dto: QueryFilterAttributeDto) {
    return this.attributeService.paginate(dto);
  }
}
