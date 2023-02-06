import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { SyncService } from 'src/app/services/sync.service';
import { enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  collectedPokemons: any[] = [];

  constructor(
    private storageService: StorageService,
    private syncService: SyncService
  ) {}

  ngOnInit(): void {
    this.getCollectedPokemons();

    this.syncService.pokemonListUpdated$.subscribe(() => {
      this.getCollectedPokemons();
    });
  }

  getCollectedPokemons() {
    const trainerDetails = this.storageService.getFromStorage('trainerDetails') || { pokemon: []};

    this.collectedPokemons = [];

    this.collectedPokemons = trainerDetails.pokemon.map((pokemon: any) => {
      return {
        ...pokemon,
        imageUrl: enviroment.POKEMON_IMAGE_URL + pokemon.id + ".png",
      };
    });
  }

}
