import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  pokemonListUpdated$: Subject<any> = new Subject();

  constructor() { }

  pokemonListUpdated() {
    this.pokemonListUpdated$.next(true);
  }
}
