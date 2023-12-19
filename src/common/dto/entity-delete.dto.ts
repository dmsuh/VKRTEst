import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNumber } from 'class-validator';

export class EntityDeleteDto {
  @ApiProperty({
    type: [Number],
  })
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  ids: number[];
}
