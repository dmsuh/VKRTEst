import { IsOptional, IsString } from 'class-validator';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class QueryFilterUserRoleDto extends PartialType(PaginateDto) {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  public name: string;
}
