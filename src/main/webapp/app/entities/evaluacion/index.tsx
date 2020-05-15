import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Evaluacion from './evaluacion';
import EvaluacionDetail from './evaluacion-detail';
import EvaluacionUpdate from './evaluacion-update';
import EvaluacionDeleteDialog from './evaluacion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EvaluacionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EvaluacionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EvaluacionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EvaluacionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Evaluacion} />
    </Switch>
  </>
);

export default Routes;
