import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Regla from './regla';
import ReglaDetail from './regla-detail';
import ReglaUpdate from './regla-update';
import ReglaDeleteDialog from './regla-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReglaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReglaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReglaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReglaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Regla} />
    </Switch>
  </>
);

export default Routes;
