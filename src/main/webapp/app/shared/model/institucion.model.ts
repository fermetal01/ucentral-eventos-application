import { Moment } from 'moment';
import { ICiudad } from 'app/shared/model/ciudad.model';
import { INodo } from 'app/shared/model/nodo.model';
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';

export interface IInstitucion {
  id?: number;
  nombre?: string;
  web?: string;
  fechaRegistro?: Moment;
  ciudad?: ICiudad;
  nodo?: INodo;
  delegadoInstitucionals?: IDelegadoInstitucional[];
}

export const defaultValue: Readonly<IInstitucion> = {};
