import { Moment } from 'moment';
import { ICiudad } from 'app/shared/model/ciudad.model';
import { INodo } from 'app/shared/model/nodo.model';
import { IAreaConocimiento } from 'app/shared/model/area-conocimiento.model';
import { IEstadistica } from 'app/shared/model/estadistica.model';
import { IArea } from 'app/shared/model/area.model';
import { IRegla } from 'app/shared/model/regla.model';

export interface IEvento {
  id?: number;
  nombre?: string;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  ubicacion?: string;
  ciudad?: ICiudad;
  nodo?: INodo;
  areaConocimientos?: IAreaConocimiento[];
  estadisticas?: IEstadistica[];
  areas?: IArea[];
  reglas?: IRegla[];
}

export const defaultValue: Readonly<IEvento> = {};
