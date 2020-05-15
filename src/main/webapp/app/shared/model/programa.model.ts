import { IInstitucion } from 'app/shared/model/institucion.model';

export interface IPrograma {
  id?: number;
  nombre?: string;
  descripcion?: string;
  institucion?: IInstitucion;
}

export const defaultValue: Readonly<IPrograma> = {};
