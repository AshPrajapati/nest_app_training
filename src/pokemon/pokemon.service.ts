import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { CreatePokemonDto } from './create-pokemon.dto';
@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) {}
  findAllPokemons(): Promise<Pokemon[]> {
    return this.prismaService.pokemon.findMany();
  }

  savePokemon(createPokemonDto: CreatePokemonDto) {
    const { name, imageUrl, power } = createPokemonDto;
    return this.prismaService.pokemon.create({
      data: {
        name,
        imageUrl,
        PokemonPower: {
          createMany: {
            data: power.map((powerId) => {
              return { powerId };
            }),
          },
        },
      },
    });
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const foundPokemon = await this.prismaService.pokemon.findFirst({
      where: { id },
    });
    if (!foundPokemon) {
      throw new NotFoundException('Pokemon Not Found');
    }

    return foundPokemon;
  }

  async deletePokemonById(id: number) {
    const foundPokemon = await this.getPokemonById(id);
    if (!foundPokemon) {
      throw new NotFoundException('Pokemon Not Found');
    }
    await this.prismaService.pokemonPower.deleteMany({
      where: { pokemonId: id },
    });
    await this.prismaService.pokemon.delete({ where: { id } });
  }
}
