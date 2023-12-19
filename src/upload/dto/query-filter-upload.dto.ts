import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryFilterUploadDto extends PartialType(PaginateDto) {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  parentId: number;
}
