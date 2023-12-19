import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAttributeDto } from './create-attribute.dto';

export class CreateAttributeGroupDto {
  @ApiProperty()
  @IsNumber()
  public sortOrder: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  public name: string;

  @ApiProperty({
    type: [CreateAttributeDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAttributeDto)
  @IsArray()
  public attributes: CreateAttributeDto[];
}
