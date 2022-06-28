import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  //Déclration des variables utilisées dans le templates

  message: string = 'Vous êtes déconnecté. (pikatchu/pikatchu)'
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialisation des variables du templates
    this.auth = this.authService;
  }

  setMessage(){
    if(this.auth.isLoggedIn){
      this.message = 'Vous êtes connecté'
    }else{
      this.message = 'Votre identifiant ou votre mot de passe est incorrect.'
    }
  }

  login(){
    //J'affiche un message d'attente
    this.message = 'Tentative de connexion en cours...';
    //Je m'inscrit à l'observable du service
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setMessage();
        if(isLoggedIn){
          this.router.navigate(['/pokemons']);
        }else{
          this.password = '';
          this.router.navigate(['/login']);
        }
      })
  }

  logout(){
    this.auth.logout();
    this.message = 'Vous êtes déconnecté.';
  }
}
