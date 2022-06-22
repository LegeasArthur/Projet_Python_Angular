import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // Je renomme la directive en pkmBorderCard pour bien montrer que 
  // cette directive s'applique sur les carte pokemon
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) { 
    // Automatiquement quand j'appelle la directive pkmBorderCard je fixe à la carte
    // une hauteur de 180px et une border de la couleur #f5f5f5.
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @Input('pkmnBorderCard') borderColor: string;

  // Action permettant de détecter que la sourie de l'utilisateur passe sur la carte
  @HostListener('mouseenter') onMouseEnter() { 
    this.setBorder(this.borderColor || this.defaultColor);
  }
  // Action permettant de détecter que la sourie de l'utilisateur sort du champ de la carte
  @HostListener('mouseleave') onMouseLeave() { 
    this.setBorder(this.initialColor);
  }

  private setHeight(height: number) { 
    this.el.nativeElement.style.height = height + 'px';
  }

  private setBorder(color: string) { 
    //this -> pour accéder à la référence de mon élément (el)
    //nativeElement -> accéder à l'élément natif
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;
  }
}
