import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './area.reducer';
import { IArea } from 'app/shared/model/area.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAreaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AreaDetail = (props: IAreaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { areaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.area.detail.title">Area</Translate> [<b>{areaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.area.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{areaEntity.nombre}</dd>
          <dt>
            <span id="capacidad">
              <Translate contentKey="ucentralEventosApplicationApp.area.capacidad">Capacidad</Translate>
            </span>
          </dt>
          <dd>{areaEntity.capacidad}</dd>
          <dt>
            <span id="ubicacion">
              <Translate contentKey="ucentralEventosApplicationApp.area.ubicacion">Ubicacion</Translate>
            </span>
          </dt>
          <dd>{areaEntity.ubicacion}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.area.tipoArea">Tipo Area</Translate>
          </dt>
          <dd>{areaEntity.tipoArea ? areaEntity.tipoArea.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.area.evento">Evento</Translate>
          </dt>
          <dd>
            {areaEntity.eventos
              ? areaEntity.eventos.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.nombre}</a>
                    {i === areaEntity.eventos.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/area" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/area/${areaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ area }: IRootState) => ({
  areaEntity: area.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AreaDetail);
