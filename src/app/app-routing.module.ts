import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "./guards/auth-guard.guard";
import { LoginPage } from "./pages/login/login.page";
import { PokemonCatalouge } from "./pages/pokemon-catalouge/pokemon-catalouge";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full" 
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "trainer",
        component: TrainerPage,
        canActivate: [AuthGuardGuard]

    },
    {
        path: "pokemon-catalouge",
        component: PokemonCatalouge,
        canActivate: [AuthGuardGuard]
    }

]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {

}