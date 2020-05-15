import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProyectoCategoria from './proyecto-categoria';
import ProyectoCategoriaDetail from './proyecto-categoria-detail';
import ProyectoCategoriaUpdate from './proyecto-categoria-update';
import ProyectoCategoriaDeleteDialog from './proyecto-categoria-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProyectoCategoriaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProyectoCategoriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProyectoCategoriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProyectoCategoriaDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProyectoCategoria} />
    </Switch>
  </>
);

export default Routes;
