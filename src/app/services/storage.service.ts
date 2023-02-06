import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getFromStorage(key: string){ 
    const value = localStorage.getItem(key); 

    try {
      if(value)
        return JSON.parse(value);
      else 
        return value;
    }catch(e) {
      return value;
    }
  }

  setToStorage(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  clearTrainerDetails() {
    localStorage.removeItem('username');
    localStorage.removeItem('trainerDetails');
  }

}
