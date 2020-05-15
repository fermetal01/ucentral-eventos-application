import { IPonencia } from 'app/shared/model/ponencia.model';
import { IEvaluador } from 'app/shared/model/evaluador.model';

export interface IEvaluacion {
  id?: number;
  calificacion?: number;
  observaciones?: string;
  ponencia?: IPonencia;
  evaluador?: IEvaluador;
}

export const defaultValue: Readonly<IEvaluacion> = {};
