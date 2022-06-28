import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

login(name: string, password: string): Observable<boolean>{
  // Dans le cas présent un créer une email et un mdp en dur
  const isLoggedIn = (name == 'pikatchu' && password == 'pikatchu')

  // delay simule le temps de réponse d'un serveur 
  return of(isLoggedIn).pipe(
    delay(1000),
    // tap mes a jour la propriété isLoggedIn
    tap(isLoggedIn => this.isLoggedIn = isLoggedIn)
  );
}

logout(){
  this.isLoggedIn = false;
}
}
