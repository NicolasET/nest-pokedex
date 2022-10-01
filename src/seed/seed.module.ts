import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from '../pokemon/pokemon.module';
// import { PokemonModule } from '../pokemon/pokemon.module'; --METHOD 1

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  // imports: [PokemonModule], --METHOD 1
  imports: [PokemonModule], // --METHOD 2
})
export class SeedModule {}
