import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { enviroment } from 'src/enviroment/enviroment';
import { Trainer } from '../models/trainer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(
    private http: HttpClient
  ) { }
  getUserList(username: string) :Observable<Trainer[]>{
    const params = new HttpParams().set('username', username);
    return this.http.get<Trainer[]>(enviroment.TRAINER_API_URL+"/trainers", { 
      params
    })
  }

  createUser(payload: any):Observable<Trainer>{
    const headers = new HttpHeaders({
      'X-API-Key': enviroment.TRAINER_API_KEY,
      'Content-Type': 'application/json'
    })
    return this.http.post<Trainer>(enviroment.TRAINER_API_URL+"/trainers",JSON.stringify(payload),{headers});
  }
}
