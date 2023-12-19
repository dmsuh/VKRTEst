import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Unique } from '../../common/validators/unique.validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role.entity';
import { UpdateUserRolePermissionDto } from './update-user-role-permission.dto';
import { Type } from 'class-transformer';

export class UpdateUserRoleDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Unique(UserRole, 'name', 'id')
  public name: string;

  @ApiProperty({
    type: [UpdateUserRolePermissionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateUserRolePermissionDto)
  public userRolePermissions: UpdateUserRolePermissionDto[];
}
