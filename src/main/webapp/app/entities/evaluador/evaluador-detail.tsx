import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './evaluador.reducer';
import { IEvaluador } from 'app/shared/model/evaluador.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEvaluadorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EvaluadorDetail = (props: IEvaluadorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { evaluadorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.evaluador.detail.title">Evaluador</Translate> [<b>{evaluadorEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="codigo">
              <Translate contentKey="ucentralEventosApplicationApp.evaluador.codigo">Codigo</Translate>
            </span>
          </dt>
          <dd>{evaluadorEntity.codigo}</dd>
          <dt>
            <span id="activo">
              <Translate contentKey="ucentralEventosApplicationApp.evaluador.activo">Activo</Translate>
            </span>
          </dt>
          <dd>{evaluadorEntity.activo ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.evaluador.persona">Persona</Translate>
          </dt>
          <dd>{evaluadorEntity.persona ? evaluadorEntity.persona.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/evaluador" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/evaluador/${evaluadorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ evaluador }: IRootState) => ({
  evaluadorEntity: evaluador.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EvaluadorDetail);
