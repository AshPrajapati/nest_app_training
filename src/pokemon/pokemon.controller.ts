import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './create-pokemon.dto';
@Controller('/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get('/')
  getAllPokemons(): Promise<Pokemon[]> {
    return this.pokemonService.findAllPokemons();
  }

  @Post('/')
  savePokemon(@Body() pokemonDto: CreatePokemonDto) {
    return this.pokemonService.savePokemon(pokemonDto);
  }

  @Get('/:id')
  getPokemonById(@Param() params) {
    return this.pokemonService.getPokemonById(+params.id);
  }

  @Delete('/:id')
  deletePokemonById(@Param() params) {
    return this.pokemonService.deletePokemonById(+params.id);
  }
}
