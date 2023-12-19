import { IsNumber, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UploadUploadDto {
  @ApiProperty()
  @IsNumber()
  @Transform((params) => parseInt(params.value, 10) || null)
  @ValidateIf((object, value) => value !== null)
  parentId: number | null = null;
}
