import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoArea from './tipo-area';
import TipoAreaDetail from './tipo-area-detail';
import TipoAreaUpdate from './tipo-area-update';
import TipoAreaDeleteDialog from './tipo-area-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TipoAreaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoAreaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoAreaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoAreaDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoArea} />
    </Switch>
  </>
);

export default Routes;
