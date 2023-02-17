import { IsNotEmpty, IsString } from 'class-validator';

export default class BookMarkDTO {
  @IsNotEmpty()
  @IsString()
  url: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
