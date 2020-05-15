import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './inscripcion.reducer';
import { IInscripcion } from 'app/shared/model/inscripcion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInscripcionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InscripcionDetail = (props: IInscripcionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { inscripcionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ucentralEventosApplicationApp.inscripcion.detail.title">Inscripcion</Translate> [
          <b>{inscripcionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fechaRegistro">
              <Translate contentKey="ucentralEventosApplicationApp.inscripcion.fechaRegistro">Fecha Registro</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={inscripcionEntity.fechaRegistro} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="aprobadoInstitucion">
              <Translate contentKey="ucentralEventosApplicationApp.inscripcion.aprobadoInstitucion">Aprobado Institucion</Translate>
            </span>
          </dt>
          <dd>{inscripcionEntity.aprobadoInstitucion ? 'true' : 'false'}</dd>
          <dt>
            <span id="aprobadoEvento">
              <Translate contentKey="ucentralEventosApplicationApp.inscripcion.aprobadoEvento">Aprobado Evento</Translate>
            </span>
          </dt>
          <dd>{inscripcionEntity.aprobadoEvento ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.inscripcion.evento">Evento</Translate>
          </dt>
          <dd>{inscripcionEntity.evento ? inscripcionEntity.evento.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.inscripcion.proyecto">Proyecto</Translate>
          </dt>
          <dd>{inscripcionEntity.proyecto ? inscripcionEntity.proyecto.id : ''}</dd>
          <dt>
            <Translate contentKey="ucentralEventosApplicationApp.inscripcion.delegado">Delegado</Translate>
          </dt>
          <dd>{inscripcionEntity.delegado ? inscripcionEntity.delegado.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/inscripcion" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/inscripcion/${inscripcionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ inscripcion }: IRootState) => ({
  inscripcionEntity: inscripcion.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InscripcionDetail);
