import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
// import { PokemonService } from 'src/pokemon/pokemon.service'; --METHOD 1
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  // constructor(private readonly pokemonService: PokemonService) {} --METHOD 1
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {} // --METHOD 2
  private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    await this.pokemonModel.deleteMany({}); //Delete all previous data
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon',
    );
    const pokemonsInsertMany: { name: string; no: number }[] = [];
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonsInsertMany.push({ name, no });
      // const pokemon = await this.pokemonModel.create({ name, no }); --METHOD 2
      // this.pokemonService.create({ name, no }); --METHOD 1
    });
    await this.pokemonModel.insertMany(pokemonsInsertMany);
    return 'Executed';
  }
}
