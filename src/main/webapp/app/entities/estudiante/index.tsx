import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Estudiante from './estudiante';
import EstudianteDetail from './estudiante-detail';
import EstudianteUpdate from './estudiante-update';
import EstudianteDeleteDialog from './estudiante-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EstudianteDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EstudianteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EstudianteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EstudianteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Estudiante} />
    </Switch>
  </>
);

export default Routes;
