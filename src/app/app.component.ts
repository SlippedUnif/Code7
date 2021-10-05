import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projeto-filmes';
  constructor(private router: Router){
    this.redirection();
  }

  redirection(){
    this.router.navigate(['/filmes/cadastro'])
  }
}
