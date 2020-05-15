import { Moment } from 'moment';
import { IEvento } from 'app/shared/model/evento.model';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';

export interface IInscripcion {
  id?: number;
  fechaRegistro?: Moment;
  aprobadoInstitucion?: boolean;
  aprobadoEvento?: boolean;
  evento?: IEvento;
  proyecto?: IProyecto;
  delegado?: IDelegadoInstitucional;
}

export const defaultValue: Readonly<IInscripcion> = {
  aprobadoInstitucion: false,
  aprobadoEvento: false
};
