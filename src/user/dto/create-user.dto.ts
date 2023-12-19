import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Unique } from '../../common/validators/unique.validator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNullable } from '../../common/validators/nullable.validator';

export class CreateUserDto {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public userRoleId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Unique(User, 'username')
  public username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 32)
  public password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 96)
  @Unique(User, 'email')
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 32)
  @IsString()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 32)
  @IsString()
  public lastName: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  @IsNullable()
  public avatar: string | null = null;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(40)
  @IsOptional()
  @IsNullable()
  public code: string | null = null;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(40)
  @IsOptional()
  @IsNullable()
  public ip: string | null = null;

  @ApiProperty()
  @IsBoolean()
  public isActive: boolean;
}
