import { IsNotEmpty } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  imageUrl: string;
  @IsNotEmpty()
  power: number[];
}
