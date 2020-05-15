import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Inscripcion from './inscripcion';
import InscripcionDetail from './inscripcion-detail';
import InscripcionUpdate from './inscripcion-update';
import InscripcionDeleteDialog from './inscripcion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InscripcionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InscripcionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InscripcionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InscripcionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Inscripcion} />
    </Switch>
  </>
);

export default Routes;
