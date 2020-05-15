import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Evaluador from './evaluador';
import EvaluadorDetail from './evaluador-detail';
import EvaluadorUpdate from './evaluador-update';
import EvaluadorDeleteDialog from './evaluador-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EvaluadorDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EvaluadorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EvaluadorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EvaluadorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Evaluador} />
    </Switch>
  </>
);

export default Routes;
