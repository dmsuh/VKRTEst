import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { QueryFilterUserDto } from '../dto/query-filter-user.dto';
import { EntityDeleteDto } from '../../common/dto/entity-delete.dto';
import { Public } from '../../auth/jwt-auth.guard';

@ApiBearerAuth('basic')
@ApiHeader({
  name: 'Authorization',
  description: 'Токен пользователя для авторизации запросов',
  required: false,
})
@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить список пользователей',
  })
  @Get()
  findAll(@Query() dto: QueryFilterUserDto) {
    return this.userService.findAll(dto);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id пользователя',
  })
  @ApiOperation({
    summary: 'Получить пользователя по id',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log('--------');
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Получить пользователя по токену доступа',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req);
    return this.userService.findOne(req.user.userId);
  }

  @ApiOperation({
    summary: 'Получить табличный список пользователей',
  })
  @Post('paginate')
  paginate(@Body() dto: QueryFilterUserDto) {
    return this.userService.paginate(dto);
  }

  @Public()
  @ApiOperation({
    summary: 'Создать профиль пользователя',
  })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id пользователя',
  })
  @ApiOperation({
    summary: 'Обновить профиль пользователя по id',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Множественное удаление пользователей',
  })
  @Delete()
  remove(@Body() dto: EntityDeleteDto) {
    return this.userService.remove(dto);
  }
}
