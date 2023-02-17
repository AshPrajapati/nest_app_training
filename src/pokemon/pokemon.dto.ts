import { IsNotEmpty } from 'class-validator';

export default class PokemonDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  imageUrl: string;
  @IsNotEmpty()
  powers: number[];
}
