import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AreaConocimiento from './area-conocimiento';
import AreaConocimientoDetail from './area-conocimiento-detail';
import AreaConocimientoUpdate from './area-conocimiento-update';
import AreaConocimientoDeleteDialog from './area-conocimiento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AreaConocimientoDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AreaConocimientoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AreaConocimientoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AreaConocimientoDetail} />
      <ErrorBoundaryRoute path={match.url} component={AreaConocimiento} />
    </Switch>
  </>
);

export default Routes;
