import { IPersona } from 'app/shared/model/persona.model';
import { IInstitucion } from 'app/shared/model/institucion.model';

export interface IDelegadoInstitucional {
  id?: number;
  codigo?: string;
  persona?: IPersona;
  institucions?: IInstitucion[];
}

export const defaultValue: Readonly<IDelegadoInstitucional> = {};
