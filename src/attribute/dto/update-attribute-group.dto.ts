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
import { UpdateAttributeDto } from './update-attribute.dto';

export class UpdateAttributeGroupDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @ApiProperty()
  @IsNumber()
  public sortOrder: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  public name: string;

  @ApiProperty({
    type: [UpdateAttributeDto],
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateAttributeDto)
  @IsArray()
  public attributes: UpdateAttributeDto[];

  getCreateAttributes() {
    return this.attributes.filter((attribute) => {
      return typeof attribute.id === 'undefined';
    });
  }

  getUpdateAttributes() {
    return this.attributes.filter((attribute) => {
      return typeof attribute.id !== 'undefined';
    });
  }
}
