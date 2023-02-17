import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Pokemon, Power } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import PokemonDto from './pokemon.dto';

type PokemonResponse = Pokemon & { powers: Power[] };
@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) {}

  private getTransformedPokemonForResponse(pokemon: any): PokemonResponse {
    const { PokemonPower, ...restPokemonFields } = pokemon;
    return {
      ...restPokemonFields,
      powers: PokemonPower.map((currPower) => currPower.power),
    };
  }

  findAllPokemon(): Promise<PokemonResponse[]> {
    return this.prismaService.pokemon
      .findMany({
        include: {
          PokemonPower: {
            select: {
              power: {},
            },
          },
        },
      })
      .then((pokemons) =>
        pokemons.map((currPokemon) =>
          this.getTransformedPokemonForResponse(currPokemon),
        ),
      );
  }

  savePokemon(pokemon: PokemonDto) {
    const { imageUrl, name, powers } = pokemon;
    return this.prismaService.pokemon.create({
      data: {
        imageUrl,
        name,
        PokemonPower: {
          createMany: {
            data: powers.map((powerId) => ({
              powerId,
            })),
          },
        },
      },
    });
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const foundPokemon = await this.prismaService.pokemon.findFirst({
      where: { id },
      include: {
        PokemonPower: {
          select: {
            power: {},
          },
        },
      },
    });
    if (!foundPokemon) {
      throw new NotFoundException('Pokemon not found!');
    }
    return this.getTransformedPokemonForResponse(foundPokemon);
  }

  async deleteById(id: number) {
    await this.prismaService.pokemonPower.deleteMany({
      where: {
        pokemonId: id,
      },
    });

    await this.prismaService.pokemon.delete({
      where: { id },
    });
  }
  async deletePokemonPower(pokemonId: number, powerId: number) {
    const foundPokemonPower = await this.prismaService.pokemonPower.findFirst({
      where: {
        pokemonId,
        powerId,
      },
    });
    if (!foundPokemonPower) {
      throw new NotFoundException('Pokmon do not have entered power');
    }
    await this.prismaService.pokemonPower.deleteMany({
      where: {
        id: foundPokemonPower.id,
      },
    });
  }
  async addPowerToPokemonById(id: number, powers: number[]) {
    const foundPokemonPower = await this.prismaService.pokemonPower.findMany({
      where: {
        powerId: {
          in: powers,
        },
        pokemonId: id,
      },
    });
    const foundPowersId = foundPokemonPower.map(
      (currPower) => currPower.powerId,
    );
    const powersToAdd = foundPokemonPower.length
      ? powers.reduce(
          (powersToAdd: number[], currPower) =>
            foundPowersId.includes(currPower)
              ? powersToAdd
              : powersToAdd.concat([currPower]),
          [],
        )
      : powers;
    if (!powersToAdd.length) {
      throw new BadRequestException('No Powers To Add');
    }
    await this.prismaService.pokemonPower.createMany({
      data: powersToAdd.map((powerId) => ({
        pokemonId: id,
        powerId,
      })),
    });
  }
}
