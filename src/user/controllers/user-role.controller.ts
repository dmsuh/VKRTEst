import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserRoleService } from '../services/user-role.service';
import { CreateUserRoleDto } from '../dto/create-user-role.dto';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { QueryFilterUserRoleDto } from '../dto/query-filter-user-role.dto';
import { EntityDeleteDto } from '../../common/dto/entity-delete.dto';

@ApiBearerAuth('basic')
@ApiHeader({
  name: 'Authorization',
  description: 'Токен пользователя для авторизации запросов',
  required: false,
})
@ApiTags('user')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @ApiOperation({
    summary: 'Получить список ролей',
  })
  @Get()
  findAll(@Query() dto: QueryFilterUserRoleDto) {
    return this.userRoleService.findAll(dto);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id роли',
  })
  @ApiOperation({
    summary: 'Получить роль по id',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userRoleService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Получить табличный список ролей',
  })
  @Post('paginate')
  paginate(@Body() dto: QueryFilterUserRoleDto) {
    return this.userRoleService.paginate(dto);
  }

  @ApiOperation({
    summary: 'Создать роль',
  })
  @Post()
  create(@Body() dto: CreateUserRoleDto) {
    return this.userRoleService.create(dto);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id роли',
  })
  @ApiOperation({
    summary: 'Обновить роль по id',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserRoleDto) {
    return this.userRoleService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Множественное удаление ролей пользователей',
  })
  @Delete()
  remove(@Body() dto: EntityDeleteDto) {
    return this.userRoleService.remove(dto);
  }
}
