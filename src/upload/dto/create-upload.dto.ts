import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUploadDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @ValidateIf((object, value) => value !== null && value !== 'null')
  parentId: number | null = null;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
