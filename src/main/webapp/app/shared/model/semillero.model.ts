import { IProfesor } from 'app/shared/model/profesor.model';
import { IInstitucion } from 'app/shared/model/institucion.model';

export interface ISemillero {
  id?: number;
  nombre?: string;
  profesor?: IProfesor;
  institucion?: IInstitucion;
}

export const defaultValue: Readonly<ISemillero> = {};
