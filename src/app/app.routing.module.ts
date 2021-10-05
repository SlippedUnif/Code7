import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroFilmeComponent } from "./components/cadastro-filme/cadastro-filme.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'filmes/cadastro',
        pathMatch: 'full'
    },
    {
        path: 'filmes/cadastro',
        component: CadastroFilmeComponent,
        loadChildren: () => import('./components/components.module').then(mod => mod.ComponentsModule)
    }
]

@NgModule({imports: [
    RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'legacy',
        anchorScrolling: 'enabled'
    })
],
 exports: [RouterModule]
})
export class AppRoutingModule {}