import { CreateUploadDto } from './create-upload.dto';
import { IsNumber } from 'class-validator';

export class UpdateUploadDto extends CreateUploadDto {
  @IsNumber()
  id: number;
}
