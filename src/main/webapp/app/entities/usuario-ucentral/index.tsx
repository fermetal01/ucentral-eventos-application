import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UsuarioUcentral from './usuario-ucentral';
import UsuarioUcentralDetail from './usuario-ucentral-detail';
import UsuarioUcentralUpdate from './usuario-ucentral-update';
import UsuarioUcentralDeleteDialog from './usuario-ucentral-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UsuarioUcentralDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UsuarioUcentralUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UsuarioUcentralUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UsuarioUcentralDetail} />
      <ErrorBoundaryRoute path={match.url} component={UsuarioUcentral} />
    </Switch>
  </>
);

export default Routes;
