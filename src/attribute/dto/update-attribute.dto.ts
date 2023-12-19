import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAttributeDto } from './create-attribute.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public id: number;

  @ApiProperty()
  @IsNumber()
  public sortOrder: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  public name: string;
}
