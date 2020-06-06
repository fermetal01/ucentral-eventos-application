import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './area-conocimiento.reducer';
import { IAreaConocimiento } from 'app/shared/model/area-conocimiento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaConocimientoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaConocimientoDetail = (props: IAreaConocimientoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { areaConocimientoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.detail.title">AreaConocimiento</Translate> [
          <b>{areaConocimientoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{areaConocimientoEntity.nombre}</dd>
          <dt>
            <span id="descripcion">
              <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.descripcion">Descripcion</Translate>
            </span>
          </dt>
          <dd>{areaConocimientoEntity.descripcion}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.areaConocimiento.padre">Padre</Translate>
          </dt>
          <dd>{areaConocimientoEntity.padre ? areaConocimientoEntity.padre.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/area-conocimiento" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/area-conocimiento/${areaConocimientoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ areaConocimiento }: IRootState) => ({
  areaConocimientoEntity: areaConocimiento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaConocimientoDetail);
