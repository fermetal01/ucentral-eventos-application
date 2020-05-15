import { Moment } from 'moment';
import { IProyectoCategoria } from 'app/shared/model/proyecto-categoria.model';
import { IAreaConocimiento } from 'app/shared/model/area-conocimiento.model';
import { ISemillero } from 'app/shared/model/semillero.model';
import { IEstudiante } from 'app/shared/model/estudiante.model';

export interface IProyecto {
  id?: number;
  nombre?: string;
  fechaRegistro?: Moment;
  categoria?: IProyectoCategoria;
  areaConocimiento?: IAreaConocimiento;
  semillero?: ISemillero;
  estudiantes?: IEstudiante[];
}

export const defaultValue: Readonly<IProyecto> = {};
