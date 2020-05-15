import { Moment } from 'moment';
import { IArea } from 'app/shared/model/area.model';
import { IEvento } from 'app/shared/model/evento.model';
import { IProyecto } from 'app/shared/model/proyecto.model';
import { IEvaluador } from 'app/shared/model/evaluador.model';

export interface IPonencia {
  id?: number;
  fechaInicio?: Moment;
  fechaFin?: Moment;
  area?: IArea;
  evento?: IEvento;
  proyecto?: IProyecto;
  evaluadors?: IEvaluador[];
}

export const defaultValue: Readonly<IPonencia> = {};
