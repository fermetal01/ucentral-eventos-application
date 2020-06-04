import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './evento.reducer';
import { IEvento } from 'app/shared/model/evento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EventoDetail = (props: IEventoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { eventoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.evento.detail.title">Evento</Translate> [<b>{eventoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nombre">
              <Translate contentKey="ucentralEventosApplicationApp.evento.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{eventoEntity.nombre}</dd>
          <dt>
            <span id="fechaInicio">
              <Translate contentKey="ucentralEventosApplicationApp.evento.fechaInicio">Fecha Inicio</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={eventoEntity.fechaInicio} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="fechaFin">
              <Translate contentKey="ucentralEventosApplicationApp.evento.fechaFin">Fecha Fin</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={eventoEntity.fechaFin} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="ubicacion">
              <Translate contentKey="ucentralEventosApplicationApp.evento.ubicacion">Ubicacion</Translate>
            </span>
          </dt>
          <dd>{eventoEntity.ubicacion}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.evento.ciudad">Ciudad</Translate>
          </dt>
          <dd>{eventoEntity.ciudad ? eventoEntity.ciudad.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.evento.nodo">Nodo</Translate>
          </dt>
          <dd>{eventoEntity.nodo ? eventoEntity.nodo.nombre : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.evento.areaConocimiento">Area Conocimiento</Translate>
          </dt>
          <dd>
            {eventoEntity.areaConocimientos
              ? eventoEntity.areaConocimientos.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.nombre}</a>
                    {i === eventoEntity.areaConocimientos.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/evento" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/evento/${eventoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/inscripcions/`} replace color="success">
          <FontAwesomeIcon icon="address-book" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="ucentralEventosApplicationApp.inscripcion.home.title">Inscripcion</Translate>
          </span>
        </Button>
        <Button tag={Link} to={`/inscripcions/`} replace color="secondary">
          <FontAwesomeIcon icon="calendar" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="ucentralEventosApplicationApp.ponencia.home.title">Malla</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ evento }: IRootState) => ({
  eventoEntity: evento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventoDetail);
