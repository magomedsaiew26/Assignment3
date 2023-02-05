import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-pokemon-catalouge',
  templateUrl: './pokemon-catalouge.html',
  styleUrls: ['./pokemon-catalouge.css']
})
export class PokemonCatalouge implements OnInit{

  displayedPokemons: any[]=[];

  offset: number = 0;

  limit: number = 20;

  constructor (private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonList(this.offset, this.limit)
  }

  getPokemonList(offset: number, limit: number) {
    this.pokemonService.getPokemonList(offset, limit).subscribe(
      (pokemonList: any) => {
        this.displayedPokemons = pokemonList.results;

        this.displayedPokemons = this.displayedPokemons.map(
          (pokemon: any) =>{
            const url=pokemon.url;
            const pokemonId=url.split('/')[6];
            const imageUrl=enviroment.POKEMON_IMAGE_URL+pokemonId+".png";
            return {
              ...pokemon,
              imageUrl
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

}
