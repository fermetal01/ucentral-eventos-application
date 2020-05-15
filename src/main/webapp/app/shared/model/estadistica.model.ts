import { IEvento } from 'app/shared/model/evento.model';

export interface IEstadistica {
  id?: number;
  nombre?: string;
  llave?: string;
  valor?: string;
  descripcion?: string;
  eventos?: IEvento[];
}

export const defaultValue: Readonly<IEstadistica> = {};
