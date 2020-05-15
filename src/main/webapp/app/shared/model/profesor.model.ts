import { IPersona } from 'app/shared/model/persona.model';
import { ISemillero } from 'app/shared/model/semillero.model';

export interface IProfesor {
  id?: number;
  area?: string;
  persona?: IPersona;
  semillero?: ISemillero;
}

export const defaultValue: Readonly<IProfesor> = {};
