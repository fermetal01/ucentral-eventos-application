import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './evaluacion.reducer';
import { IEvaluacion } from 'app/shared/model/evaluacion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEvaluacionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EvaluacionDetail = (props: IEvaluacionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { evaluacionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.evaluacion.detail.title">Evaluacion</Translate> [<b>{evaluacionEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="calificacion">
              <Translate contentKey="ucentralEventosApplicationApp.evaluacion.calificacion">Calificacion</Translate>
            </span>
          </dt>
          <dd>{evaluacionEntity.calificacion}</dd>
          <dt>
            <span id="observaciones">
              <Translate contentKey="ucentralEventosApplicationApp.evaluacion.observaciones">Observaciones</Translate>
            </span>
          </dt>
          <dd>{evaluacionEntity.observaciones}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.evaluacion.ponencia">Ponencia</Translate>
          </dt>
          <dd>{evaluacionEntity.ponencia ? evaluacionEntity.ponencia.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.evaluacion.evaluador">Evaluador</Translate>
          </dt>
          <dd>{evaluacionEntity.evaluador ? evaluacionEntity.evaluador.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/evaluacion" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/evaluacion/${evaluacionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ evaluacion }: IRootState) => ({
  evaluacionEntity: evaluacion.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EvaluacionDetail);
