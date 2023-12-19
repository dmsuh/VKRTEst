import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginateDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public id: number;

  @ApiProperty({
    required: false,
    type: String,
    example: 'id,name,sortOrder',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  public fields: string;

  @ApiProperty({
    required: false,
    type: String,
    example: 'id:desc,name:asc,createdAt:desc',
  })
  @IsString()
  @IsOptional()
  public order: string;

  @ApiProperty({
    required: false,
    type: String,
    example: 'columnName',
  })
  @IsString()
  @IsOptional()
  public isNull: string;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public limit;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  public offset;
}
