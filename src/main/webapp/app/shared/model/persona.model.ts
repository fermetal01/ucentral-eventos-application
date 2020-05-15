import { ICiudad } from 'app/shared/model/ciudad.model';
import { ITipoIdentificacion } from 'app/shared/model/tipo-identificacion.model';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { IUsuarioUcentral } from 'app/shared/model/usuario-ucentral.model';
import { IProfesor } from 'app/shared/model/profesor.model';
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';
import { IEvaluador } from 'app/shared/model/evaluador.model';

export interface IPersona {
  id?: number;
  nombres?: string;
  apellidos?: string;
  numeroIdenficacion?: string;
  email?: string;
  ciudad?: ICiudad;
  tipoIdentificacion?: ITipoIdentificacion;
  estudiante?: IEstudiante;
  usuarioUcentral?: IUsuarioUcentral;
  profesor?: IProfesor;
  delegadoInstitucional?: IDelegadoInstitucional;
  evaluador?: IEvaluador;
}

export const defaultValue: Readonly<IPersona> = {};
