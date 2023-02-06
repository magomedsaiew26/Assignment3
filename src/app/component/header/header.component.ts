import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() pageTitle: string | undefined;
  @Input() linkTitle: string | undefined;

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {}


  goToLinkedPage() {
    this.router.navigate([this.linkTitle === 'Trainer' ? '/trainer' : '/pokemon-catalouge']);
  }
  
  logout() {
    this.storageService.clearTrainerDetails();
    this.router.navigate(['/login']);
  }
}
