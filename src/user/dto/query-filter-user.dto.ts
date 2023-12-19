import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryFilterUserDto extends PartialType(PaginateDto) {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public username: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public email: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public firstName: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public lastName: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public code: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public ip: string;

  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public isActive: boolean;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt: Date;
}
