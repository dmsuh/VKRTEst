import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UniqueEntityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  primaryField: string;
}
