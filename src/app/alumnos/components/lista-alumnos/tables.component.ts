import { selectAlumnos } from './../../state/alumnos.selectors';
import { alumnosCargados } from './../../state/alumnos.actions';
import { selectSesionActiva } from 'src/app/core/state/sesion.selectors';
import { Alumnos } from 'src/app/models/alumnos';
import { Component,OnInit,} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListaAlumnosService } from 'src/app/alumnos/services/lista-alumnos.service';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { Store } from '@ngrx/store';
import { Sesion } from 'src/app/models/sesion';
import { AlumnoState } from 'src/app/models/models-state/alumno.state';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  suscripcionSesion!: Subscription;
  suscripcionAlumnos!: Subscription;
  suscripcionAlumnosData!: Subscription;
  usuarioActivo?: Usuario;
  columnasAdmin: string[] = ['nombre', 'apellido', 'correo', 'cursando', 'actions'];
  columnasUsuario: string[] = ['nombre', 'apellido', 'correo', 'cursando'];
  data: MatTableDataSource<Alumnos>= new MatTableDataSource<Alumnos>();
  busquedaEnTabla!: FormGroup;

  constructor(
    private alumnosService: ListaAlumnosService,
    private ruta: Router,
    private storeSesion: Store<Sesion>,
    private storeAlumnos: Store<AlumnoState>
  ) {
  }

  ngOnInit(): void {
    this.suscripcionSesion= this.storeSesion.select(selectSesionActiva).subscribe((datos)=>{
      this.usuarioActivo=datos.usuarioActivo
    })

    this.suscripcionAlumnos= this.alumnosService.obtenerAlumnos().subscribe({
      next: (alumnos: Alumnos[])=>{
        this.storeAlumnos.dispatch(alumnosCargados({alumnos}))
      }
    })

    this.suscripcionAlumnosData= this.storeAlumnos.select(selectAlumnos).subscribe((alumnos:Alumnos[])=>{
      this.data= new MatTableDataSource<Alumnos>(alumnos)
    })

    this.busquedaEnTabla= new FormGroup({
      apellido: new FormControl ('',[]),
      curso: new FormControl('',[])
    })
  }

  ngOnDestroy(): void {
    this.suscripcionAlumnos.unsubscribe();
    this.suscripcionAlumnosData.unsubscribe();
    this.suscripcionSesion.unsubscribe();
  }

  buscarXApellido(){
    const valorObtenido = this.busquedaEnTabla.get('apellido')?.value;
    this.storeAlumnos.select(selectAlumnos).pipe(
      map((alumnos:Alumnos[])=> alumnos.filter((a:Alumnos)=>
        a.apellido.toLowerCase()==valorObtenido.toLowerCase())
      )
    ).subscribe((alumnos)=>{
      this.data.data = alumnos;
    })
  }

  buscarXCurso(){
    const valorObtenido = this.busquedaEnTabla.get('curso')?.value;
    this.storeAlumnos.select(selectAlumnos).pipe(
      map((alumnos:Alumnos[])=> alumnos.filter((a:Alumnos)=>
        a.cursoActual.nombre.toLowerCase()==valorObtenido.toLowerCase())
      )
    ).subscribe((alumnos)=>{
      this.data.data = alumnos;
    })
  }

  vaciarCampoCurso(){
    this.busquedaEnTabla.get('curso')?.reset();
    this.storeAlumnos.select(selectAlumnos).subscribe((alumnos:Alumnos[])=>{
      this.data= new MatTableDataSource<Alumnos>(alumnos)
    });
  }

  vaciarCampoApellido(){
    this.busquedaEnTabla.get('apellido')?.reset();
    this.storeAlumnos.select(selectAlumnos).subscribe((alumnos:Alumnos[])=>{
      this.data= new MatTableDataSource<Alumnos>(alumnos)
    });
  }

  addAlumno(){
    this.ruta.navigate(['alumnos/add-alumno'])
  }

  editarAlumno(alumno:Alumnos){
    const datos={
      ...alumno,
      cursoActual: JSON.stringify(alumno.cursoActual)
    }
    this.ruta.navigate(['alumnos/edit-alumno', datos])
  }

  borrarAlumno(id:number){
    // this.alumnosService.eliminarAlumnos(id),
    // this.data.data=this.lista
  }


}

