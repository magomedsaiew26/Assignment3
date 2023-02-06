import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { StorageService } from 'src/app/services/storage.service';
import { SyncService } from 'src/app/services/sync.service';
import { enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-pokemon-catalouge',
  templateUrl: './pokemon-catalouge.html',
  styleUrls: ['./pokemon-catalouge.css']
})
export class PokemonCatalouge implements OnInit{

  displayedPokemons: any[]=[];

  offset: number = 0;

  limit: number = 10;

  constructor (
    private pokemonService: PokemonService,
    private syncService: SyncService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.getPokemonList(this.offset, this.limit);

    this.syncService.pokemonListUpdated$.subscribe(() => {
      this.getPokemonList(this.offset, this.limit);
    });
  }

  getPokemonList(offset: number, limit: number) {
    this.pokemonService.getPokemonList(offset, limit).subscribe(
      (pokemonList: any) => {
        this.displayedPokemons = pokemonList.results;

        const trainerDetails = this.storageService.getFromStorage('trainerDetails');
        const existingPokemonList = trainerDetails.pokemon;

        this.displayedPokemons = this.displayedPokemons.map(
          (pokemon: any) =>{
            const url = pokemon.url;
            const pokemonId = url.split('/')[6];
            const imageUrl = enviroment.POKEMON_IMAGE_URL + pokemonId + ".png";

            const findIndex = existingPokemonList.findIndex((pokemon: any) => pokemon.id === pokemonId);

            return {
              ...pokemon,
              imageUrl,
              isCollected: findIndex > -1
            };
          }
        )
   }
    )
  }

  showMore() {
    this.offset = ((this.offset / this.limit) + 1 ) * this.limit;
    this.getPokemonList(this.offset, this.limit);
  }

  goToPrevious() {
    this.offset = ((this.offset / this.limit) - 1 ) * this.limit;
    this.getPokemonList(this.offset, this.limit);
  }

}
