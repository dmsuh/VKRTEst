import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadUploadDto } from './dto/upload-upload.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EntityDeleteDto } from '../common/dto/entity-delete.dto';
import { QueryFilterUploadDto } from './dto/query-filter-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth('basic')
@ApiHeader({
  name: 'Authorization',
  description: 'Токен пользователя для авторизации запросов',
  required: false,
})
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    summary: 'Получить список файлов',
  })
  @Get()
  findAll(@Query() dto: QueryFilterUploadDto) {
    return this.uploadService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.uploadService.findOne(+id);
  }

  @Post('paginate')
  paginate(@Body() dto: QueryFilterUploadDto) {
    return this.uploadService.paginate(dto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
    }),
  )
  upload(
    @Body() dto: UploadUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.upload(dto, file);
  }

  @Post()
  create(@Body() dto: CreateUploadDto) {
    return this.uploadService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUploadDto) {
    return this.uploadService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Множественное удаление файлов',
  })
  @Delete()
  remove(@Body() dto: EntityDeleteDto) {
    return this.uploadService.remove(dto);
  }
}
