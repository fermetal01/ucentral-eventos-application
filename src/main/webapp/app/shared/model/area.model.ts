import { ITipoArea } from 'app/shared/model/tipo-area.model';
import { IEvento } from 'app/shared/model/evento.model';

export interface IArea {
  id?: number;
  nombre?: string;
  capacidad?: number;
  ubicacion?: string;
  tipoArea?: ITipoArea;
  eventos?: IEvento[];
}

export const defaultValue: Readonly<IArea> = {};
