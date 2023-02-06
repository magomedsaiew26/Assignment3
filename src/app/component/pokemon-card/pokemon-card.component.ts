import { Component, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { SyncService } from 'src/app/services/sync.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() name: string | undefined;
  @Input() imageUrl: string | undefined;
  @Input() cardUserInPage: 'catalogue' | 'trainer' = 'catalogue';
  @Input() isColledted: boolean = false;

  constructor(
    private trainerService: TrainerService,
    private storageService: StorageService,
    private syncService: SyncService
  ) {}

  extractPokemonIdFromImageUrl() {
    return this.imageUrl ? this.imageUrl.split('/')[8].split('.')[0]: '';
  }


  addPokemonToTrainerList() {
    const trainerDetails = this.storageService.getFromStorage('trainerDetails');

    const existingPokemonList = trainerDetails.pokemon;

    const findIndex = existingPokemonList.findIndex((pokemon: any) => pokemon.name === this.name);

    if(findIndex > -1) {
      alert('Pokemon already exists!');
      return;
    }

    const payload = {
      username: trainerDetails.username,
      id: trainerDetails.id,
      pokemon: [
        ...trainerDetails.pokemon, 
        {
          id: this.extractPokemonIdFromImageUrl(),
          name: this.name,
        }
      ]
    };

    this.trainerService.updatePokemonList(payload).subscribe((updatedTrainerDetails) => {
      this.storageService.setToStorage("trainerDetails", updatedTrainerDetails);
      this.syncService.pokemonListUpdated();
    });
  }

  removePokemonToTrainerList() {
    const trainerDetails = this.storageService.getFromStorage('trainerDetails');
    const existingPokemonList = trainerDetails.pokemon;
    const findIndex = existingPokemonList.findIndex((pokemon: any) => pokemon.name === this.name);

    if(findIndex > -1) {
      existingPokemonList.splice(findIndex, 1);
    }

    const payload = {
      username: trainerDetails.username,
      id: trainerDetails.id,
      pokemon: [
        ...existingPokemonList,
      ]
    };

    this.trainerService.updatePokemonList(payload).subscribe((updatedTrainerDetails) => {
      this.storageService.setToStorage("trainerDetails", updatedTrainerDetails);
      this.syncService.pokemonListUpdated();
    });
  }
}
