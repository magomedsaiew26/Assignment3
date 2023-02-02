import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getFromStorage(key: string){ 
    const value = localStorage.getItem(key); 
    return value && typeof value !== "string" ?  JSON.parse(value) : value;
  }
  setToStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

}
