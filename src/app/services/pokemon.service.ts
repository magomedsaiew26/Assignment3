import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemonList(offset: number, limit: number): Observable<any[]>{
    return this.http.get<any[]>(enviroment.POKEMON_SERVER_URL+"/pokemon",{params: {offset, limit}})

  }

}
