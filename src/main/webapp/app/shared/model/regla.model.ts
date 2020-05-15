import { IEvento } from 'app/shared/model/evento.model';

export interface IRegla {
  id?: number;
  nombre?: string;
  llave?: string;
  valor?: string;
  auxiliar?: string;
  eventos?: IEvento[];
}

export const defaultValue: Readonly<IRegla> = {};
