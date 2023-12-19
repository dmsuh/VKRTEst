import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRolePermissionDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @ApiProperty()
  @IsBoolean()
  public isRead: boolean;

  @ApiProperty()
  @IsBoolean()
  public isCreate: boolean;

  @ApiProperty()
  @IsBoolean()
  public isUpdate: boolean;

  @ApiProperty()
  @IsBoolean()
  public isDelete: boolean;
}
