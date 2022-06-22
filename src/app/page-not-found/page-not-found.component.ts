import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <!-- on garde la navBar car elle est créée dans le composant parent -->
    <div class='center'>
      <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"/>
      <h1>Hey, cette page n'existe pas !</h1>
      <!-- routerLink permet de rediriger au même titre que les méthodes créer dans la logique des composant (exemple : goToPokemon)
            Il est tout de même préférable de gérer les redirections coté logique (sous forme de fonction) -->
      <a routerLink="/pokemons" class="waves-effect waves-teal btn-flat">
        Retourner à l' accueil
      </a>
    </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent {}
