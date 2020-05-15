import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tipo-identificacion.reducer';
import { ITipoIdentificacion } from 'app/shared/model/tipo-identificacion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoIdentificacionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoIdentificacionDetail = (props: ITipoIdentificacionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tipoIdentificacionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.detail.title">TipoIdentificacion</Translate> [
          <b>{tipoIdentificacionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombres">
              <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.nombres">Nombres</Translate>
            </span>
          </dt>
          <dd>{tipoIdentificacionEntity.nombres}</dd>
          <dt>
            <span id="codigo">
              <Translate contentKey="ucentralEventosApplicationApp.tipoIdentificacion.codigo">Codigo</Translate>
            </span>
          </dt>
          <dd>{tipoIdentificacionEntity.codigo}</dd>
        </dl>
        <Button tag={Link} to="/tipo-identificacion" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tipo-identificacion/${tipoIdentificacionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tipoIdentificacion }: IRootState) => ({
  tipoIdentificacionEntity: tipoIdentificacion.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoIdentificacionDetail);
