import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import persona, {
  PersonaState
} from 'app/entities/persona/persona.reducer';
// prettier-ignore
import tipoIdentificacion, {
  TipoIdentificacionState
} from 'app/entities/tipo-identificacion/tipo-identificacion.reducer';
// prettier-ignore
import usuarioUcentral, {
  UsuarioUcentralState
} from 'app/entities/usuario-ucentral/usuario-ucentral.reducer';
// prettier-ignore
import nodo, {
  NodoState
} from 'app/entities/nodo/nodo.reducer';
// prettier-ignore
import institucion, {
  InstitucionState
} from 'app/entities/institucion/institucion.reducer';
// prettier-ignore
import departamento, {
  DepartamentoState
} from 'app/entities/departamento/departamento.reducer';
// prettier-ignore
import ciudad, {
  CiudadState
} from 'app/entities/ciudad/ciudad.reducer';
// prettier-ignore
import programa, {
  ProgramaState
} from 'app/entities/programa/programa.reducer';
// prettier-ignore
import estudiante, {
  EstudianteState
} from 'app/entities/estudiante/estudiante.reducer';
// prettier-ignore
import profesor, {
  ProfesorState
} from 'app/entities/profesor/profesor.reducer';
// prettier-ignore
import semillero, {
  SemilleroState
} from 'app/entities/semillero/semillero.reducer';
// prettier-ignore
import proyecto, {
  ProyectoState
} from 'app/entities/proyecto/proyecto.reducer';
// prettier-ignore
import proyectoCategoria, {
  ProyectoCategoriaState
} from 'app/entities/proyecto-categoria/proyecto-categoria.reducer';
// prettier-ignore
import areaConocimiento, {
  AreaConocimientoState
} from 'app/entities/area-conocimiento/area-conocimiento.reducer';
// prettier-ignore
import evento, {
  EventoState
} from 'app/entities/evento/evento.reducer';
// prettier-ignore
import inscripcion, {
  InscripcionState
} from 'app/entities/inscripcion/inscripcion.reducer';
// prettier-ignore
import delegadoInstitucional, {
  DelegadoInstitucionalState
} from 'app/entities/delegado-institucional/delegado-institucional.reducer';
// prettier-ignore
import tipoArea, {
  TipoAreaState
} from 'app/entities/tipo-area/tipo-area.reducer';
// prettier-ignore
import area, {
  AreaState
} from 'app/entities/area/area.reducer';
// prettier-ignore
import ponencia, {
  PonenciaState
} from 'app/entities/ponencia/ponencia.reducer';
// prettier-ignore
import evaluacion, {
  EvaluacionState
} from 'app/entities/evaluacion/evaluacion.reducer';
// prettier-ignore
import evaluador, {
  EvaluadorState
} from 'app/entities/evaluador/evaluador.reducer';
// prettier-ignore
import regla, {
  ReglaState
} from 'app/entities/regla/regla.reducer';
// prettier-ignore
import estadistica, {
  EstadisticaState
} from 'app/entities/estadistica/estadistica.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly persona: PersonaState;
  readonly tipoIdentificacion: TipoIdentificacionState;
  readonly usuarioUcentral: UsuarioUcentralState;
  readonly nodo: NodoState;
  readonly institucion: InstitucionState;
  readonly departamento: DepartamentoState;
  readonly ciudad: CiudadState;
  readonly programa: ProgramaState;
  readonly estudiante: EstudianteState;
  readonly profesor: ProfesorState;
  readonly semillero: SemilleroState;
  readonly proyecto: ProyectoState;
  readonly proyectoCategoria: ProyectoCategoriaState;
  readonly areaConocimiento: AreaConocimientoState;
  readonly evento: EventoState;
  readonly inscripcion: InscripcionState;
  readonly delegadoInstitucional: DelegadoInstitucionalState;
  readonly tipoArea: TipoAreaState;
  readonly area: AreaState;
  readonly ponencia: PonenciaState;
  readonly evaluacion: EvaluacionState;
  readonly evaluador: EvaluadorState;
  readonly regla: ReglaState;
  readonly estadistica: EstadisticaState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  persona,
  tipoIdentificacion,
  usuarioUcentral,
  nodo,
  institucion,
  departamento,
  ciudad,
  programa,
  estudiante,
  profesor,
  semillero,
  proyecto,
  proyectoCategoria,
  areaConocimiento,
  evento,
  inscripcion,
  delegadoInstitucional,
  tipoArea,
  area,
  ponencia,
  evaluacion,
  evaluador,
  regla,
  estadistica,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
