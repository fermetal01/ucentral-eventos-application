import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoIdentificacion from './tipo-identificacion';
import TipoIdentificacionDetail from './tipo-identificacion-detail';
import TipoIdentificacionUpdate from './tipo-identificacion-update';
import TipoIdentificacionDeleteDialog from './tipo-identificacion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TipoIdentificacionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoIdentificacionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoIdentificacionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoIdentificacionDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoIdentificacion} />
    </Switch>
  </>
);

export default Routes;
