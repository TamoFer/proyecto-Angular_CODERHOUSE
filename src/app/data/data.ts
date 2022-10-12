import { Alumnos } from '../models/alumnos';
import { Curso } from 'src/app/models/curso';
export class Datos {
  static cursos: Curso[]=
  [{id: 1, nombre:'Desarrollo Web', profesor: 'Matias Cordoba', finicio: new Date(2022,3,15), ftermino: new Date(2022,5,15), descripcion: 'Curso incial de programacion web donde veras HTML 5 y CSS3 entre demas cosas', disponibilidad:true},

  {id: 2, nombre:'JavaScript', profesor: 'Anthony Lopez', finicio: new Date(2022,5,29), ftermino: new Date(2022,7,10), descripcion: 'Curso donde aprenderas a potenciar tus conocimientos de maquetacion con Javascript', disponibilidad:true},

  {id: 3, nombre:'React Js', profesor: 'Abner Garcia', finicio: new Date(2022,7,29), ftermino: new Date(2022,9,15), descripcion: 'Aprenderas uno de los frameworks mas populares de programacion front-end', disponibilidad:true},

  {id: 4, nombre:'Angular', profesor: 'Abner Garcia', finicio: new Date(2022,7,29), ftermino: new Date(2022,9,15), descripcion: 'Aprenderas uno de los frameworks mas populares de programacion front-end', disponibilidad:false},

  {id: 5, nombre:'Backend', profesor: 'Juan Pablo Guerrero', finicio: new Date(2022,9,29), ftermino: new Date(2022,11,15), descripcion: 'Curso donde aprenderas todo lo relacionado con el desarrollo backend de una APP web', disponibilidad:false},

  {id: 6, nombre:'Python', profesor: 'Jacksito Gonzalez', finicio: new Date(2022,8,10), ftermino: new Date(2022,10,10), descripcion: 'Curso donde aprenderas a manejar el lenguaje de programacion mas versatil de la actualidad', disponibilidad:true}]

  static listaAlumnos: Alumnos[]=[
    {idAlumno: 1,
    nombre: 'Ijak',
    apellido:'Perez',
    correo:'ijak@perez.com',
    cursoActual:this.cursos[0]},

    {idAlumno: 2,
      nombre: 'Abner',
      apellido:'Gonzales',
      correo:'abner@gonzales.com',
      cursoActual:this.cursos[1]}
  ]
}