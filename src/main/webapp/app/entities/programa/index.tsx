import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Programa from './programa';
import ProgramaDetail from './programa-detail';
import ProgramaUpdate from './programa-update';
import ProgramaDeleteDialog from './programa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProgramaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProgramaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProgramaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProgramaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Programa} />
    </Switch>
  </>
);

export default Routes;
