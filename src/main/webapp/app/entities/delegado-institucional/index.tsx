import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DelegadoInstitucional from './delegado-institucional';
import DelegadoInstitucionalDetail from './delegado-institucional-detail';
import DelegadoInstitucionalUpdate from './delegado-institucional-update';
import DelegadoInstitucionalDeleteDialog from './delegado-institucional-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DelegadoInstitucionalDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DelegadoInstitucionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DelegadoInstitucionalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DelegadoInstitucionalDetail} />
      <ErrorBoundaryRoute path={match.url} component={DelegadoInstitucional} />
    </Switch>
  </>
);

export default Routes;
