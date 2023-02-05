import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCatalouge } from './pages/pokemon-catalouge/pokemon-catalouge';
import { TrainerPage } from './pages/trainer/trainer.page';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PokemonCatalouge,
    TrainerPage,
    PokemonCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
