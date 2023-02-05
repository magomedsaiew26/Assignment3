import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { StorageService } from 'src/app/services/storage.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {
  userName: FormControl = new FormControl("");
  constructor (
    private router: Router,
    private storageService: StorageService,
    private trainerService: TrainerService
  ){

  }
  ngOnInit(): void {
    if(this.storageService.getFromStorage("username"))
    {
      this.router.navigate(["/pokemon-catalouge"]);
    }
  }
  onUserNameSubmit (){
    this.trainerService.getUserList(this.userName.value).subscribe(
      (userList: Array<Trainer>) => {
        console.log(userList);
        if (userList.length > 0) {
          const trainer: Trainer = userList[0];
          this.setTrainerDetailToStorageAndNavigate(trainer);
        } 
        else {
          this.createNewTrainer(this.userName.value);
        }
}
    )
  }

  createNewTrainer(userName:string){
    const payload = {
      username: userName,
      pokemon: []
    };

    this.trainerService.createUser(payload).subscribe(
      (trainer: Trainer) => {
        this.setTrainerDetailToStorageAndNavigate(trainer);
      }
    )
  }

  setTrainerDetailToStorageAndNavigate(trainer: Trainer){
    this.storageService.setToStorage("username",trainer.username);
    this.storageService.setToStorage("trainerDetails", trainer);
    this.router.navigate(["/pokemon-catalouge"]);
  }

}
