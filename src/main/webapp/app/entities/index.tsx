import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Persona from './persona';
import TipoIdentificacion from './tipo-identificacion';
import UsuarioUcentral from './usuario-ucentral';
import Nodo from './nodo';
import Institucion from './institucion';
import Departamento from './departamento';
import Ciudad from './ciudad';
import Programa from './programa';
import Estudiante from './estudiante';
import Profesor from './profesor';
import Semillero from './semillero';
import Proyecto from './proyecto';
import ProyectoCategoria from './proyecto-categoria';
import AreaConocimiento from './area-conocimiento';
import Evento from './evento';
import Inscripcion from './inscripcion';
import DelegadoInstitucional from './delegado-institucional';
import TipoArea from './tipo-area';
import Area from './area';
import Ponencia from './ponencia';
import Evaluacion from './evaluacion';
import Evaluador from './evaluador';
import Regla from './regla';
import Estadistica from './estadistica';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}persona`} component={Persona} />
      <ErrorBoundaryRoute path={`${match.url}tipo-identificacion`} component={TipoIdentificacion} />
      <ErrorBoundaryRoute path={`${match.url}usuario-ucentral`} component={UsuarioUcentral} />
      <ErrorBoundaryRoute path={`${match.url}nodo`} component={Nodo} />
      <ErrorBoundaryRoute path={`${match.url}institucion`} component={Institucion} />
      <ErrorBoundaryRoute path={`${match.url}departamento`} component={Departamento} />
      <ErrorBoundaryRoute path={`${match.url}ciudad`} component={Ciudad} />
      <ErrorBoundaryRoute path={`${match.url}programa`} component={Programa} />
      <ErrorBoundaryRoute path={`${match.url}estudiante`} component={Estudiante} />
      <ErrorBoundaryRoute path={`${match.url}profesor`} component={Profesor} />
      <ErrorBoundaryRoute path={`${match.url}semillero`} component={Semillero} />
      <ErrorBoundaryRoute path={`${match.url}proyecto`} component={Proyecto} />
      <ErrorBoundaryRoute path={`${match.url}proyecto-categoria`} component={ProyectoCategoria} />
      <ErrorBoundaryRoute path={`${match.url}area-conocimiento`} component={AreaConocimiento} />
      <ErrorBoundaryRoute path={`${match.url}evento`} component={Evento} />
      <ErrorBoundaryRoute path={`${match.url}inscripcion`} component={Inscripcion} />
      <ErrorBoundaryRoute path={`${match.url}delegado-institucional`} component={DelegadoInstitucional} />
      <ErrorBoundaryRoute path={`${match.url}tipo-area`} component={TipoArea} />
      <ErrorBoundaryRoute path={`${match.url}area`} component={Area} />
      <ErrorBoundaryRoute path={`${match.url}ponencia`} component={Ponencia} />
      <ErrorBoundaryRoute path={`${match.url}evaluacion`} component={Evaluacion} />
      <ErrorBoundaryRoute path={`${match.url}evaluador`} component={Evaluador} />
      <ErrorBoundaryRoute path={`${match.url}regla`} component={Regla} />
      <ErrorBoundaryRoute path={`${match.url}estadistica`} component={Estadistica} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
