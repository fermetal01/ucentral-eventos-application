import { IDepartamento } from 'app/shared/model/departamento.model';

export interface ICiudad {
  id?: number;
  nombre?: string;
  departamento?: IDepartamento;
}

export const defaultValue: Readonly<ICiudad> = {};
