import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ponencia.reducer';
import { IPonencia } from 'app/shared/model/ponencia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPonenciaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PonenciaDetail = (props: IPonenciaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ponenciaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.ponencia.detail.title">Ponencia</Translate> [<b>{ponenciaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fechaInicio">
              <Translate contentKey="ucentralEventosApplicationApp.ponencia.fechaInicio">Fecha Inicio</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={ponenciaEntity.fechaInicio} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="fechaFin">
              <Translate contentKey="ucentralEventosApplicationApp.ponencia.fechaFin">Fecha Fin</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={ponenciaEntity.fechaFin} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.ponencia.area">Area</Translate>
          </dt>
          <dd>{ponenciaEntity.area ? ponenciaEntity.area.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.ponencia.evento">Evento</Translate>
          </dt>
          <dd>{ponenciaEntity.evento ? ponenciaEntity.evento.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.ponencia.proyecto">Proyecto</Translate>
          </dt>
          <dd>{ponenciaEntity.proyecto ? ponenciaEntity.proyecto.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.ponencia.evaluador">Evaluador</Translate>
          </dt>
          <dd>
            {ponenciaEntity.evaluadors
              ? ponenciaEntity.evaluadors.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === ponenciaEntity.evaluadors.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/ponencia" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ponencia/${ponenciaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ ponencia }: IRootState) => ({
  ponenciaEntity: ponencia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PonenciaDetail);
