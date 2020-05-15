import { IPersona } from 'app/shared/model/persona.model';
import { IPonencia } from 'app/shared/model/ponencia.model';

export interface IEvaluador {
  id?: number;
  codigo?: string;
  activo?: boolean;
  persona?: IPersona;
  ponencias?: IPonencia[];
}

export const defaultValue: Readonly<IEvaluador> = {
  activo: false
};
