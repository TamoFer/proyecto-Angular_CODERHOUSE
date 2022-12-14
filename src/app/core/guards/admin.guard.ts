import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { selectSesionActiva } from '../state/sesion.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{


  constructor(
    private store: Store<Sesion>,
    private ruta: Router
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select(selectSesionActiva).pipe(
        map((sesion: Sesion) => {
          if(sesion.usuarioActivo?.admin){
            return true;
          }else{
            alert("No tiene permisos para acceder a este sitio");
            this.ruta.navigate(['inicio']);
            return false;
          }
        })
      );
}
}
