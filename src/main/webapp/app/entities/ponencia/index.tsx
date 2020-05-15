import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Ponencia from './ponencia';
import PonenciaDetail from './ponencia-detail';
import PonenciaUpdate from './ponencia-update';
import PonenciaDeleteDialog from './ponencia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PonenciaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PonenciaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PonenciaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PonenciaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Ponencia} />
    </Switch>
  </>
);

export default Routes;
