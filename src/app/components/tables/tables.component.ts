import { Configuracion, token } from './../../config';
import { Curso } from './../../models/curso';
import { Alumnos } from './../../models/alumnos';
import { Component,Inject,OnInit,} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarAlumnoComponent } from '../dialogs/agregar-alumno/agregar-alumno.component';
import { EditarAlumnoComponent } from '../dialogs/editar-alumno/editar-alumno.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  cursos!:Curso[];
  listaAlumnos!: Alumnos[];
  columnas: string[] = ['nombre', 'correo', 'cursando', 'actions'];
  data: MatTableDataSource<Alumnos> = new MatTableDataSource<Alumnos>(this.listaAlumnos);

  constructor(
    private dialog: MatDialog,
    @Inject(token) private config:Configuracion
  ) { }

  ngOnInit(): void {
    this.cursos=this.config.cursos.obtenerCursos();
    this.listaAlumnos=this.config.alumnos.obtenerListaAlumnos();
  }

  ngAfterContentChecked(): void{
    this.data.data=this.listaAlumnos;
  }


  agregarAlumno(){
      let dialog = this.dialog.open(AgregarAlumnoComponent, {
      });
      dialog.beforeClosed().subscribe(res => {
        if (res.nombre!=''){
          this.listaAlumnos.push(
            {
              ...res,
              idAlumno:this.listaAlumnos.length+1
            }
          )
          this.data.data = this.listaAlumnos
        }else{
          this.data.data = this.listaAlumnos
        }
      })
  }

  editAlumno(alumno:Alumnos){
    let dialog = this.dialog.open(EditarAlumnoComponent, {
      data: {name:alumno.nombre, curso:alumno.cursoActual}
    });
    dialog.beforeClosed().subscribe(res => {
        res.nombre==='' && !res.nombre?(res.nombre=alumno.nombre):(alumno.nombre=res.nombre);
        res.apellido===''&& !res.apellido?(res.apellido=alumno.apellido):(alumno.apellido=res.apellido);
        res.correo===''&& !res.correo?(res.correo=alumno.correo):(alumno.correo=res.correo);
        res.cursoActual ==='' || res.cursoActual===undefined? (res.cursoActual=alumno.cursoActual) : (alumno.cursoActual=res.cursoActual);
        res.idAlumno=alumno.idAlumno;
        this.data.data = this.listaAlumnos;
      });
  }

  deleteAlumno(id:number){
    let indice = this.listaAlumnos.findIndex(alumno => alumno.idAlumno == id)
    this.listaAlumnos.splice(indice, 1)
    this.data.data = this.listaAlumnos
  }

  buscarXNombre(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.data.filterPredicate = function(alumno: Alumnos, filtro: string){
      return alumno.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    };
    this.data.filter = valorObtenido.trim().toLowerCase();
  }

  buscarXCurso(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.data.filterPredicate = function(alumno: Alumnos, filtro: string){
      return alumno.cursoActual.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase());
    };
    this.data.filter = valorObtenido.trim().toLowerCase();
  }

}

