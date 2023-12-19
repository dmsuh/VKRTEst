import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UniqueEntityDto } from './common/dto/unique-entity.dto';
import { Public } from './auth/jwt-auth.guard';
import { UserService } from './user/services/user.service';
import { Response } from 'express';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth('basic')
  @ApiHeader({
    name: 'Authorization',
    description: 'Токен пользователя для авторизации запросов',
    required: false,
  })
  @ApiOperation({
    summary: 'Временное решение получения профиля пользователя по токену',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return this.userService.findOne(req.user.userId);
  }

  @ApiBearerAuth('basic')
  @ApiHeader({
    name: 'Authorization',
    description: 'Токен пользователя для авторизации запросов',
    required: false,
  })
  @ApiParam({
    name: 'entity',
    type: String,
    description: 'Тип сущности: category, user, filter',
  })
  @ApiOperation({
    summary: 'Проверить уникальную запись на существование',
  })
  @Post('unique/:entity')
  uniqueEntity(
    @Param('entity')
    entity: string,
    @Body() dto: UniqueEntityDto,
  ) {
    return this.appService.uniqueEntity(entity, dto);
  }

  @ApiParam({
    name: 'filename',
    type: String,
    description: 'Имя файла',
  })
  @ApiOperation({
    summary: 'Получить файл',
  })
  @Public()
  @Get('files/:filename')
  getFiles(
    @Param('filename')
    filename: string,
  ) {
    return this.appService.getFiles(filename);
  }
}
