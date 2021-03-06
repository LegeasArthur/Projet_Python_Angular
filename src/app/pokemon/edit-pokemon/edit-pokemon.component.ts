import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
  <!-- le ? permet de ne rien afficher si le pokemon n'existe pas -->
    <h2 *ngIf="pokemon" class="center">Editer {{ pokemon?.name}}</h2>
    <p *ngIf="pokemon" class="center"> 
      <img [src]="pokemon.picture">
    </p>
    <!-- J'appelle le formulaire par son selector et je lui passe un pokemon -->
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>

    <!-- J'affiche le loader en attendant l'affichage -->
    <h3 *ngIf="!pokemon" class="center">
    <app-loader></app-loader>
    </h3>
  `
})
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon|undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if(pokemonId){
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
    }else{
      this.pokemon = undefined;
    } 
  }
}
