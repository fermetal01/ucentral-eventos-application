import { IPersona } from 'app/shared/model/persona.model';
import { IPrograma } from 'app/shared/model/programa.model';
import { IProyecto } from 'app/shared/model/proyecto.model';

export interface IEstudiante {
  id?: number;
  carrera?: string;
  persona?: IPersona;
  programa?: IPrograma;
  proyectos?: IProyecto[];
}

export const defaultValue: Readonly<IEstudiante> = {};
