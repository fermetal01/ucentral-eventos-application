import { IInstitucion } from 'app/shared/model/institucion.model';
import { IProfesor } from 'app/shared/model/profesor.model';

export interface ISemillero {
  id?: number;
  nombre?: string;
  institucion?: IInstitucion;
  profesors?: IProfesor[];
}

export const defaultValue: Readonly<ISemillero> = {};
