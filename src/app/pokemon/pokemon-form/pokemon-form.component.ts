import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls:[ './pokemon-fom.component.css' ]
})
export class PokemonFormComponent implements OnInit {
  // permet de signifier qu'il faut un pokemon pour que le form marche
  @Input() pokemon: Pokemon;
  types: string[];

  constructor(private router: Router,private pokemonService: PokemonService) { }

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
  }

  hasType(type: string): boolean{
    return this.pokemon.types.includes(type);
  }

  // event permet de savoir si l'utilisateur à coché ou décoché une case.
  selectType($event: Event, type: string){
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;

    if(isChecked){
      this.pokemon.types.push(type);
    }else{
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  isTypesValid(type: string): boolean{
    
    // Bloquer la seul case qui est cochée
    if(this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    // Bloque si l'utilisateur à déja coché 3
    if(this.pokemon.types.length > 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  onSubmit(){
    console.log('Submit form !');
    this.router.navigate(['/pokemon', this.pokemon.id]);
  }
}
