import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './delegado-institucional.reducer';
import { IDelegadoInstitucional } from 'app/shared/model/delegado-institucional.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDelegadoInstitucionalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DelegadoInstitucionalDetail = (props: IDelegadoInstitucionalDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { delegadoInstitucionalEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.detail.title">DelegadoInstitucional</Translate> [
          <b>{delegadoInstitucionalEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="codigo">
              <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.codigo">Codigo</Translate>
            </span>
          </dt>
          <dd>{delegadoInstitucionalEntity.codigo}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.persona">Persona</Translate>
          </dt>
          <dd>{delegadoInstitucionalEntity.persona ? delegadoInstitucionalEntity.persona.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.delegadoInstitucional.institucion">Institucion</Translate>
          </dt>
          <dd>
            {delegadoInstitucionalEntity.institucions
              ? delegadoInstitucionalEntity.institucions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === delegadoInstitucionalEntity.institucions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/delegado-institucional" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/delegado-institucional/${delegadoInstitucionalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ delegadoInstitucional }: IRootState) => ({
  delegadoInstitucionalEntity: delegadoInstitucional.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DelegadoInstitucionalDetail);
