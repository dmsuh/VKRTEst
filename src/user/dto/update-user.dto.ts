import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Unique } from '../../common/validators/unique.validator';
import { User } from '../entities/user.entity';
import { IsNullable } from '../../common/validators/nullable.validator';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty()
  @IsNumber()
  public id: number;

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
  @Unique(User, 'username', 'id')
  public username: string;

  @ApiProperty({
    required: false,
    description:
      'Пароль будет изменён в том случае, если это свойство будет указано в теле объекта',
  })
  @IsNotEmpty()
  @IsString()
  @Length(6, 32)
  @IsOptional()
  public password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 96)
  @Unique(User, 'email', 'id')
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
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
