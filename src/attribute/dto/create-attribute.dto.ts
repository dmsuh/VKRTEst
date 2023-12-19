import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateAttributeDto {
  @ApiProperty()
  @IsNumber()
  public sortOrder: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  public name: string;
}
