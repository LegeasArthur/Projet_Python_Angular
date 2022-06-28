import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',

})
export class SearchPokemonComponent implements OnInit {
  // Subject appartient à RxJS cette classe permet de sauvgarder les recherches de l'utilisateurs (flux de donner dans le temps).
  // Cette classe se comporte comme un observable mais on peut le piloter (on peut construire ce flux de données.).
  // {a...ab...etc}
  seaechTerms = new Subject<string>();
  // A partir des données de Subject on veut construire une liste de pokemon)
  pokemons$: Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    // Mise en place d'un scénario permettant de temporiser le lancement de la requête.
    // On envoir pas une requête à chaque frappe sur le clavier, création d'un délai de 300 ms et éliminer les recherches successivement idéntique.
    this.pokemons$ = this.seaechTerms.pipe(
      // ( Flux sans changement venant de pokemon$) {..."a"."ab..."abz"."ab"...."abs"......}
      debounceTime(300), 
      // (Second flux en filtrant les erreurs de frappes (300 ms)) {......."ab....."ab"...."abs"......}
      distinctUntilChanged(),
      // (Troisième flux en filtrant les erreurs de frappes (300 ms)) {......."ab............."abs"......}
      // On effectue la requête (on utilise pas map car ca renvoie un observable)
      // On utilise donc concaMap ou mergeMap ou switchMap(effetue la plus récente recherche)
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      );
  }

  // Permet de pousser dans le template en temps réel la saisie de l'utilisateur
  search(term: string){
    this.seaechTerms.next(term);
  }

  goToDetail(pokemon: Pokemon){
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
