import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import PokemonDto from './pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Get()
  getAllPokemon() {
    return this.pokemonService.findAllPokemon();
  }

  @Post()
  savePokemons(@Body() pokemon: PokemonDto) {
    return this.pokemonService.savePokemon(pokemon);
  }

  @Get(':id')
  getPokemonById(@Param() params) {
    return this.pokemonService.getPokemonById(+params.id);
  }

  @Delete(':id')
  deletePokemonById(@Param() params) {
    return this.pokemonService.deleteById(+params.id);
  }

  @Post(':id/powers')
  addPowerToPokemonById(
    @Param() { id },
    @Body() payload: { powers: PokemonDto['powers'] },
  ) {
    return this.pokemonService.addPowerToPokemonById(+id, payload.powers);
  }

  @Delete(':id/powers/:powerId')
  deletePokemonPowerById(@Param() params) {
    return this.pokemonService.deletePokemonPower(+params.id, +params.powerId);
  }
}
