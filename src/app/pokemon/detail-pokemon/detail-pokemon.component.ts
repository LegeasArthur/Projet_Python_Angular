import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  // Si j'ai trouvé un pokemon alors ce paramète contien un pokemon que je pourrais afficher à l'utilisateur
  // ou alors je pourrais afficher à l'utilisateur un message lui expliquant que aucun pokemon n'a été trouvé (grace à *ngIf)
  pokemon: Pokemon | undefined;

  // Injection du service ActivatedRoute, cela permet de le rendre disponible dans le composant
  constructor(private route: ActivatedRoute, private router: Router, private pokemonService: PokemonService) { }

  // A l'initialisation de mon composant je vais récupérer l'id dans 
  // l'url et je vais chercher le pokémon correspondant dans ma liste.
  ngOnInit() {
    // Récupération de l'id dans l'url
    // (string | null )permet de dire à Angular que je récupère soit une String soit null
      const pokemonId: string | null = this.route.snapshot.paramMap.get('id')
      
      // Si j'ai un pokemonId alors je vais chercher le pokemon et je l'attribut à la propriété pokemon
      if(pokemonId){
        this.pokemonService.getPokemonById(+pokemonId)
          .subscribe(pokemon => this.pokemon = pokemon);
      }
  }

  goToPokemonList(){
    // On ajoute un tableau car on peut avoir besoin de paramètre pour l'url vers laquelle on redirige
    this.router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon){
    this.router.navigate(['/edit/pokemon', this.pokemon?.id])
  }
}
