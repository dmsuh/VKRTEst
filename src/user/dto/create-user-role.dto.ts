import { IsNotEmpty, IsString } from 'class-validator';
import { Unique } from '../../common/validators/unique.validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role.entity';

export class CreateUserRoleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Unique(UserRole, 'name')
  public name: string;
}
