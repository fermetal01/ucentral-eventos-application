import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Estadistica from './estadistica';
import EstadisticaDetail from './estadistica-detail';
import EstadisticaUpdate from './estadistica-update';
import EstadisticaDeleteDialog from './estadistica-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EstadisticaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EstadisticaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EstadisticaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EstadisticaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Estadistica} />
    </Switch>
  </>
);

export default Routes;
