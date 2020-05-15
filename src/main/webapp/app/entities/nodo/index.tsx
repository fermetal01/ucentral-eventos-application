import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Nodo from './nodo';
import NodoDetail from './nodo-detail';
import NodoUpdate from './nodo-update';
import NodoDeleteDialog from './nodo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={NodoDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NodoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NodoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NodoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Nodo} />
    </Switch>
  </>
);

export default Routes;
