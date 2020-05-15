import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './estadistica.reducer';
import { IEstadistica } from 'app/shared/model/estadistica.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEstadisticaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EstadisticaDetail = (props: IEstadisticaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { estadisticaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.estadistica.detail.title">Estadistica</Translate> [
          <b>{estadisticaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.estadistica.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{estadisticaEntity.nombre}</dd>
          <dt>
            <span id="llave">
              <Translate contentKey="ucentralEventosApplicationApp.estadistica.llave">Llave</Translate>
            </span>
          </dt>
          <dd>{estadisticaEntity.llave}</dd>
          <dt>
            <span id="valor">
              <Translate contentKey="ucentralEventosApplicationApp.estadistica.valor">Valor</Translate>
            </span>
          </dt>
          <dd>{estadisticaEntity.valor}</dd>
          <dt>
            <span id="descripcion">
              <Translate contentKey="ucentralEventosApplicationApp.estadistica.descripcion">Descripcion</Translate>
            </span>
          </dt>
          <dd>{estadisticaEntity.descripcion}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.estadistica.evento">Evento</Translate>
          </dt>
          <dd>
            {estadisticaEntity.eventos
              ? estadisticaEntity.eventos.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === estadisticaEntity.eventos.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/estadistica" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/estadistica/${estadisticaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ estadistica }: IRootState) => ({
  estadisticaEntity: estadistica.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EstadisticaDetail);
