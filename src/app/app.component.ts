import { loadCursos, loadCursosSuccess } from './cursos/state/cursos.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CursosService } from './cursos/services/cursos.service';
import { Curso } from './models/curso';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto-angular-admin_cursos';
  constructor(
    private cursoService: CursosService,
    private store: Store<AppState>
  ){
    this.store.dispatch(loadCursos());
  }

  ngOnInit(){
    this.cursoService.getCursos().subscribe((cursos: Curso[]) => {
      this.store.dispatch(loadCursosSuccess({ cursos: cursos }));
    });
  }
}
