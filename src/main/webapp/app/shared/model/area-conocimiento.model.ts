import { IEvento } from 'app/shared/model/evento.model';

export interface IAreaConocimiento {
  id?: number;
  nombre?: string;
  descripcion?: string;
  padre?: IAreaConocimiento;
  eventos?: IEvento[];
}

export const defaultValue: Readonly<IAreaConocimiento> = {};
