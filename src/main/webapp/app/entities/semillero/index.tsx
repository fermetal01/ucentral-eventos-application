import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Semillero from './semillero';
import SemilleroDetail from './semillero-detail';
import SemilleroUpdate from './semillero-update';
import SemilleroDeleteDialog from './semillero-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SemilleroDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SemilleroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SemilleroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SemilleroDetail} />
      <ErrorBoundaryRoute path={match.url} component={Semillero} />
    </Switch>
  </>
);

export default Routes;
