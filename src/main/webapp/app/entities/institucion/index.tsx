import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Institucion from './institucion';
import InstitucionDetail from './institucion-detail';
import InstitucionUpdate from './institucion-update';
import InstitucionDeleteDialog from './institucion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InstitucionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InstitucionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InstitucionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InstitucionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Institucion} />
    </Switch>
  </>
);

export default Routes;
