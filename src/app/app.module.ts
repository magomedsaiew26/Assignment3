import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCatalouge } from './pages/pokemon-catalouge/pokemon-catalouge';
import { TrainerPage } from './pages/trainer/trainer.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PokemonCatalouge,
    TrainerPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
